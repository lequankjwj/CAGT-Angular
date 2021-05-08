import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, filter, take, switchMap, finalize, map } from 'rxjs/operators';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authHeader = 'Authorization';
    private token: string;
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private auth: AuthenticateService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const configUrl = req.url.split('/');
        if (configUrl.includes('_config') || configUrl.includes('i18n') || configUrl.includes('Login')) {
            req = req.clone({
                url: req.url,
                // headers: req.headers.set('Cache-Control', 'no-cache').set('Pragma', 'no-cache')
            });
            return next.handle(req);
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                    if (this.refreshTokenInProgress) {
                        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                        // which means the new token is ready and we can retry the request again
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;

                        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                        this.refreshTokenSubject.next(null);

                        return this.refreshAccessToken().pipe(
                            switchMap((success: boolean) => {
                                this.refreshTokenSubject.next(success);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                            // for the next time the token needs to be refreshed
                            finalize(() => {
                                this.refreshTokenInProgress = false;
                                // this.router.navigate([UrlConstant.ROUTE.LOGIN]);
                            })
                        );
                    }
                } else {
                    return throwError(error);
                }
            })
        );
    }

    /**
     * Refreshs access token
     * @returns access token
     */
    private refreshAccessToken(): Observable<any> {
        const requestBody = {
            refreshToken: this.auth.getRefreshToken(),
        };
        return this.auth.doRefreshToken(requestBody).pipe(
            map(res => {
                // set user token
                if (res.result) {
                    this.auth.setUserToken(res.result);
                } else {
                    return this.router.navigateByUrl(UrlConstant.ROUTE.LOGIN);
                }
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // Get an access token
        this.token = this.auth.getAccessToken();
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        if (!this.token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        // if (!request.url.match('localhost:4200')) {
        //     return request;
        // }
        return request.clone({
            headers: request.headers.set(this.authHeader, 'Bearer ' + this.token).set('Access-Control-Max-Age', '86400'),
        });
    }
}
