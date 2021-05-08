import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { UrlConstant } from '@core/constants/url.constant';
@Injectable({ providedIn: 'root' })
export class MasterGuard implements CanActivate {
    constructor(public router: Router, private auth: AuthenticateService) {}
    canActivate(): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            return false;
        }
        return true;
    }
}
