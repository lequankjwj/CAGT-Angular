import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from '@core/config/app.config';
import { AppConstant } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { MenuService } from '@management-state/menu/menu.service';
import { Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { FormUtil } from '@core/utils/form';
import { SecurityUtil } from '@core/utils/security';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
    returnUrl: string;
    formLogin: FormGroup;

    private destroyed$ = new Subject();

    isLoginHRM = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private auth: AuthenticateService,
        private menuService: MenuService
    ) {
        this.createFormLogin();
    }

    ngOnInit() {
        localStorage.clear();
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
        this.router.navigate([this.returnUrl]);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    createFormLogin() {
        this.formLogin = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            sessionCode: [''],
        });
    }

    loginWithHRM() {
        this.isLoginHRM = true;
    }

    /**
     * Signins auth component
     */
    signin() {
        const keyLogin = this.auth.getCookieKeyLogin();
        if (this.formLogin.invalid) {
            FormUtil.validateAllFormFields(this.formLogin);
            return;
        }
        this.formLogin.get('sessionCode').setValue(keyLogin);
        this.auth
            .doLogin(this.formLogin.value)
            .pipe(
                tap(res => {
                    if (res) {
                        this.menuService.getMenu(true);
                    }
                }),
                delay(500)
            )
            .pipe(takeUntil(this.destroyed$))
            .subscribe((isLogin: boolean) => {
                if (isLogin) {
                    /// handler
                    this.showLinkProfile();
                }
            });
    }

    redirectSSO() {
        // location.href = AppConfig.settings.sso + AppConstant.SSO_LINK(location.origin);
    }

    private showLinkProfile() {
        if (this.auth.getUserInfo() && this.auth.getUserInfo().doiTuongId) {
            this.router.navigate([''], {
                queryParams: {
                    k: encodeURIComponent(SecurityUtil.set(this.auth.getUserInfo().doiTuongId.toString())),
                },
            });
        } else {
            this.router.navigate([UrlConstant.ROUTE.LOGIN_NS]);
        }
    }
}
