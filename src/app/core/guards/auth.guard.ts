import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticateService} from '@core/auth/authenticate.service';
import {UrlConstant} from '@core/constants/url.constant';
import {MenuQuery} from '@management-state/menu/menu.query';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(public router: Router, private auth: AuthenticateService, private menuQuery: MenuQuery) {}

    /**
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            return false;
        }

        // if (!this.menuQuery.checkLinkUserHasAccess(state.url)) {
        //     this.router.navigate([UrlConstant.ROUTE.FORBIDEN]);
        // }

        return true;
    }

    /**
     *
     * @param childRoute
     * @param state
     */

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthorized()) {
            this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            return false;
        }

        // if (!this.menuQuery.checkLinkUserHasAccess(state.url)) {
        //     this.router.navigate([UrlConstant.ROUTE.FORBIDEN]);
        // }

        return true;
    }

}
