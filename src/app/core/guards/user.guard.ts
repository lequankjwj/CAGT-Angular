import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { UrlConstant } from '@core/constants/url.constant';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanLoad {
    constructor(private router: Router, private auth: AuthenticateService) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.auth.getUserInfo();
        if (user.doiTuongId) {
            return true;
        }

        return this.router.navigateByUrl(UrlConstant.ROUTE.LOGIN_NS);
    }
}
