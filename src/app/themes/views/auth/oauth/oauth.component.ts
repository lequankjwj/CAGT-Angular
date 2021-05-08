import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { MenuService } from '@management-state/menu/menu.service';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-oauth',
    templateUrl: './oauth.component.html',
    styleUrls: ['./oauth.component.scss'],
})
export class OauthComponent implements OnInit, OnDestroy {
    session_state: string;
    code: string;

    private destroyed$ = new Subject();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private menuService: MenuService,
        private auth: AuthenticateService
    ) {}

    ngOnInit() {
        this.route.queryParams.pipe(delay(200)).subscribe(params => {
            if (params) {
                this.session_state = params.session_state;
                this.code = params.code;
                this.authenticatedWithSSO(this.session_state, this.code);
            }
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    authenticatedWithSSO(session?, code?) {
        const requestLogin = {
            session_state: session,
            code: code,
        };
        this.auth.doLoginSSO(requestLogin).subscribe(
            isLogin => {
                if (isLogin) {
                    this.menuService.getMenu(true);
                    this.router.navigate(['']);
                } else {
                    this.router.navigate([UrlConstant.ROUTE.LOGIN]);
                }
            },
            err => {
                this.router.navigate([UrlConstant.ROUTE.LOGIN]);
            }
        );
    }
}
