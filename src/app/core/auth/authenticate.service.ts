import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { IUserInfo, ITokenInfo } from '@core/auth/user-token.model';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { Observable } from 'rxjs';
import { IResponseData } from '@core/models/common/response-data.model';
import { HandlerService } from '../services/common/handler-error.service';
import { AuthStore } from '@management-state/auth/auth.store';
import { IAppConfig } from '@core/config/app-config.model';
import { AppConstant } from '@core/constants/app.constant';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from '../services/common/security.service';
import { resetStores } from '@datorama/akita';
import { MenuStore } from '@management-state/menu/menu.store';
import { AppConfig } from '@core/config/app.config';

const backLinks = [
    ''
]

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    private apiUrl: string;
    private accessToken: string;
    private jwtToken = 'jwt-token';
    private avatarLocal = 'a-avatar';
    private identityKey = 'keyLogin';
    private helper = new JwtHelperService();

    constructor(
        private http: HttpClient,
        private router: Router,
        private handlerError: HandlerService,
        private cookieService: CookieService,
        private secure: SecurityService,
        private store: AuthStore,
        private menuStore: MenuStore
    ) {
        this.tokenExpired();
    }

    loadConfig() {
        const jsonFile = `_config/config.${environment.name}.json?v=${AppConstant.VERSION}`;
        debugger;
        return this.http.get(jsonFile).subscribe((res: IAppConfig) => {
            this.apiUrl = `${res.apiServer}/api/cmd/${res.version}/`;
        });
    }

    /**
     * Do login
     * @returns
     * @param request
     */
    doLogin(request) {
        const url = `${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Login`;
        return this.setRequestLogin(url, request);
    }

    doLoginSSO(requestLogin) {
        const url = `${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/ExternalLogin`;
        const request = {
            ...requestLogin,
            sessionCode: this.getCookieKeyLogin(),
        };

        return this.setRequestLogin(url, request);
    }

    /**
     * Do refresh token
     * @param requestRefreshToken
     * @returns refresh token
     */
    doRefreshToken(requestRefreshToken): Observable<IResponseData<ITokenInfo>> {
        const url = `${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Refresh-Token`;
        return this.http.post<IResponseData<ITokenInfo>>(url, requestRefreshToken).pipe(catchError(this.handlerError.handleError));
    }

    /**
     * Do logout
     * @returns
     */
    doLogout(model) {
        return this.http.post(`${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Logout`, model).subscribe(
            (res: IResponseData<any>) => {
                // if result is oke: token is revoke -> clear access token and refresh token in browser
                // remove store
                localStorage.removeItem(this.jwtToken);
                localStorage.clear();
                this.menuStore.update(state => ({
                    ...state,
                    menu: undefined,
                }));
                // redirect login page
                if (environment.production && AppConfig.settings.sso) {
                    // location.href = AppConfig.settings.sso + AppConstant.SSO_LOGOUT(location.origin);
                } else {
                    this.router.navigate([UrlConstant.ROUTE.LOGIN]);
                }
            },
            err => {
                this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            }
        );
    }

    /**
     * Gets refresh token
     * @returns
     */
    getRefreshToken() {
        const userToken = JSON.parse(localStorage.getItem(this.jwtToken)) as ITokenInfo;
        if (!userToken) {
            return;
        }

        return userToken.refreshToken;
    }

    /**
     * Gets access token
     * @returns
     */
    getAccessToken() {
        const userToken = JSON.parse(localStorage.getItem(this.jwtToken)) as ITokenInfo;
        if (!userToken) {
            return;
        }

        return userToken.accessToken;
    }

    /**
     * Gets expired time
     * @returns
     */
    getExpiredTime() {
        const userToken = JSON.parse(localStorage.getItem(this.jwtToken)) as ITokenInfo;
        if (!userToken) {
            return;
        }

        return userToken.expiresIn;
    }

    /**
     * Gets user info by decode token
     */
    getUserInfo(): IUserInfo {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return;
        }
        return this.helper.decodeToken(accessToken);
    }

    /**
     * Sets user token
     * @param userToken
     */
    setUserToken(userToken: ITokenInfo) {
        localStorage.setItem(this.jwtToken, JSON.stringify(userToken));
    }

    /**
     * Determines whether authorized is
     */
    isAuthorized() {
        return this.getAccessToken();
    }

    /**
     * Determines whether permission access has
     */
    hasPermissionAccess() {
        return true;
    }

    isExcuteRefreshToken() {
        // Nếu token lớn hơn 5 phút thì refresh token
        return this.getExpiredTime() - this.getTimeSkipUtilForRefreshToken() > 5 * 60;
    }

    /**
     * Tokens expired
     * @returns
     */
    tokenExpired() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return;
        }

        const userInfo = this.helper.decodeToken(accessToken) as IUserInfo;
        if (!userInfo) {
            return;
        }

        const expiryRemaining = userInfo.exp - Math.floor(new Date().getTime() / 1000);
        // delay 5s chờ refresh token khi chuyển page
        return expiryRemaining > -5;
    }

    private getTimeSkipUtilForRefreshToken() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return;
        }

        const userInfo = this.helper.decodeToken(accessToken) as IUserInfo;
        if (!userInfo) {
            return;
        }

        return userInfo.exp - Math.floor(new Date().getTime() / 1000);
    }

    private setRequestLogin(url: string, request) {
        return this.http.post(url, request).pipe(
            map((res: IResponseData<ITokenInfo>) => {
                // set user token
                if (res.result) {
                    this.setUserToken(res.result);

                    // update
                    this.store.update(state => ({
                        ...state,
                        ...this.getUserInfo(),
                    }));
                    return true;
                }
                return false;
            })
        );
    }

    setCookieKeyLogin(value: string) {
        this.cookieService.set(this.identityKey, value);
    }

    getCookieKeyLogin() {
        const key = this.cookieService.get(this.identityKey);
        if (key) {
            return key;
        }

        const newKey = this.secure.generateGuid();
        this.setCookieKeyLogin(newKey);
        return newKey;
    }
}
