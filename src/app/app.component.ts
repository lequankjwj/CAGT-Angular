import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingService } from '@core/services/common/loading.service';
import { UtilService } from '@core/services/common/util.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, map, tap } from 'rxjs/operators';
import { AppMessageConfig } from '@core/config/app.config.message';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { MenuService } from '@management-state/menu/menu.service';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { SecurityUtil } from '@core/utils/security';

const exceptUrls = ['/', '/login'];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    loading = false;

    constructor(
        private util: UtilService,
        private loader: LoadingService,
        private spinner: NgxSpinnerService,
        private appConfig: AppMessageConfig,
        private auth: AuthenticateService,
        private menuService: MenuService,
        private apiService: ApiService,
        private router: Router
    ) {
        this.auth.loadConfig();
        this.appConfig.load();
    }

    ngOnInit() {
        this.loader.loadingSub.pipe(delay(0)).subscribe(loading => {
            if (loading) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        });

        const path = location.pathname;
        // check with access token
        if (this.auth.isAuthorized()) {
            if (this.auth.isExcuteRefreshToken()) {
                const requestBody = {
                    refreshToken: this.auth.getRefreshToken(),
                };
                return this.apiService
                    .post(UrlConstant.API.ACL_ACCOUNT + '/Refresh-Token', requestBody)
                    .pipe(
                        map(res => res.result),
                        tap(res => {
                            if (res) {
                                this.menuService.getMenu(false);
                            }
                        })
                    )

                    .subscribe(res => {
                        // set user token
                        if (res) {
                            this.auth.setUserToken(res);
                            if (exceptUrls.includes(path)) {
                                this.showLinkProfile();
                            }
                        } else {
                            return this.router.navigateByUrl(UrlConstant.ROUTE.LOGIN);
                        }
                    });
            } else {
                if (exceptUrls.includes(path)) {
                    this.showLinkProfile();
                }
            }
        }        
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
