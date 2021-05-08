import { IUserInfo } from '@core/auth/user-token.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticateService } from '@core/auth/authenticate.service';
import { UtilService } from '@core/services/common/util.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AvatarComponent } from '@themes/layouts/management/avatar/avatar.component';
import { AppConfig } from '@core/config/app.config';
import { Subscription } from 'rxjs';
import { EventBusService, EventBus } from '@core/services/common/event-bus.service';
import { ChangePasswordComponent } from '@themes/layouts/management/change-password/change-password.component';
import { AuthService } from '@management-state/auth/auth.service';
import { AppConstant } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { SecurityUtil } from '@core/utils/security';
import { Router } from '@angular/router';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { environment } from '@env/environment';
import { LocalStorageUtil } from '@core/utils/localstorage';
import {IMenuSidebar} from '@core/models/common';
import {MenuQuery} from '@management-state/menu/menu.query';
import {MenuService} from '@management-state/menu/menu.service';

declare let mLayout: any;

const PrefixUrl = {
    APTN: 'APTN',
};

@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit, AfterViewInit, OnDestroy {
    photoUrl = './assets/images/logo-mini-220_b.jpg';
    avatarUrl = './assets/images/no-avatar.jpg';

    user: IUserInfo;
    eventbusSub: Subscription;
    hasAccessProfile = false;

    private config = AppConfig.settings;

    isProduction = false;
    isTopMenu = AppConfig.settings.menu?.top ?? false;

    listMenu: IMenuSidebar[] = [];
    constructor(
        private util: UtilService,
        private auth: AuthenticateService,
        private authState: AuthService,
        private modal: NzModalService,
        private viewContainerRef: ViewContainerRef,
        private eventbus: EventBusService,
        private translate: CustomTranslateService,
        private router: Router,
        private menuQuery: MenuQuery,
        private menuService: MenuService
    ) {}

    ngOnInit(): void {
        // load menus
        this.listMenu = this.menuQuery.getStorage();

        // load user
        this.user = this.auth.getUserInfo();

        // update state
        if (this.user) {
            this.authState.updateUserInfo(this.user);
            if (LocalStorageUtil.getAvatar()) {
                this.avatarUrl = this.config.resourceUrl + LocalStorageUtil.getAvatar();
            } else {
                if (this.user.avatar !== null && this.user.avatar !== undefined && this.user.avatar !== '') {
                    this.avatarUrl = this.config.resourceUrl + this.user.avatar;
                    LocalStorageUtil.setAvatar(this.user.avatar);
                }
            }

            if (this.user.doiTuongId) {
                this.hasAccessProfile = true;
            }
            // Nếu đổi avatar thành công thì cập nhật ngay lên header
            this.eventbusSub = this.eventbus.on(EventBus.UpdateAvatarEnum, res => {
                const arrayUrl = location.pathname.split('/');
                if ((res.isCaNhan && res.trangThai) || (res.trangThai && arrayUrl.includes(''))) {
                    if (
                        res.avatarUrlFromResponse != null &&
                        res.avatarUrlFromResponse !== '' &&
                        res.avatarUrlFromResponse !== undefined
                    ) {
                        this.avatarUrl = this.config.resourceUrl + res.avatarUrlFromResponse;
                    } else {
                        this.avatarUrl = AppConstant.NO_AVATAR_URL;
                    }
                }
            });
        }

        this.isProduction = environment.production;
    }

    trackByFunction(index, item) {
        return index;
    }

    showLinkProfile() {
        this.router.navigate([''], {
            queryParams: {
                k: encodeURIComponent(SecurityUtil.set(this.user.doiTuongId.toString())),
            },
        });
    }

    ngOnDestroy() {
        if (this.eventbusSub) {
            this.eventbusSub.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        mLayout.initHeader();
    }

    setLang(value) {
        this.translate.setCurrentLang(value);
    }

    get flagImage() {
        return this.translate.languageImage();
    }

    onLogout() {
        const body = {
            listOfSessionCode: [],
            isCurrentUserLogout: true,
        };
        this.auth.doLogout(body);
    }

    createModalUpdateAvatar() {
        const modal = this.modal.create({
            nzTitle: 'Cập nhật hình đại diện',
            nzContent: AvatarComponent,
            nzClassName: 'modal-update-avatar',
            nzViewContainerRef: this.viewContainerRef,
            nzGetContainer: () => document.body,
            nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
            nzFooter: [
                {
                    label: 'change component title from outside',
                    onClick: componentInstance => {},
                },
            ],
        });
    }

    createModalChangePassword() {
        this.modal.create({
            nzTitle: 'Thay đổi mật khẩu',
            nzContent: ChangePasswordComponent,
            nzClassName: 'modal-change-password',
            nzViewContainerRef: this.viewContainerRef,
            nzGetContainer: () => document.body,
            nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
            nzFooter: [],
        });
    }

    minimizeSidebar() {
        const body = document.getElementsByTagName('body')[0];
        const classSidebar = document.getElementsByClassName('m-aside-left--minimize');
        if (classSidebar && classSidebar.length > 0) {
            body.classList.remove('m-brand--minimize', 'm-aside-left--minimize');
        } else {
            body.classList.add('m-brand--minimize', 'm-aside-left--minimize');
        }
    }

    changeUrlNodeCha(url: string, name: string, i: number, j: number) {
        // remove
        this.listMenu.map(menu => {
            menu.isActive = false;
            menu.subMenu.map(item => {
                if (item.subMenu.length > 0) {
                    item.subMenu.map(y => (y.isActive = false));
                } else {
                    item.isActive = false;
                }
            });
        });
        // set
        this.listMenu[i].isActive = true;
        this.listMenu[i].subMenu[j].isActive = true;
        this.menuService.setStorage(this.listMenu);
        // redirect link

        // this.router.navigate([url]);
        this.changeUrlToSubforder(url);
    }

    /**
     * Adds tab
     * @param url
     * @param name
     * @param i
     * @param j
     * @param k
     */
    changeUrl(url: string, name: string, i: number, j: number, k?: number) {
        // remove
        this.listMenu.map(menu => {
            menu.isActive = false;
            menu.subMenu.map(item => {
                item.isActive = false;
                item.subMenu.map(x => {
                    if (x.subMenu.length > 0) {
                        x.subMenu.map(y => (y.isActive = false));
                    } else {
                        x.isActive = false;
                    }
                });
            });
        });
        // set
        this.listMenu[i].isActive = true;
        this.listMenu[i].subMenu[j].isActive = true;
        this.listMenu[i].subMenu[j].subMenu[k].isActive = true;
        this.menuService.updateData(this.listMenu);
        // redirect link
        // this.router.navigate([url]);
        this.changeUrlToSubforder(url);
    }

    /**
     *
     * @param url
     * @param name
     * @param i
     * @param j
     * @param k
     * @param y
     */
    changeUrlsub(url: string, name: string, i: number, j: number, k: number, y: number) {
        // remove
        this.listMenu.map(menu => {
            menu.isActive = false;
            menu.subMenu.map(item => {
                item.isActive = false;
                item.subMenu.map(x => {
                    x.isActive = false;
                    if (x.subMenu.length > 0) {
                        x.subMenu.map(h => {
                            h.isActive = false;
                            if (h.subMenu.length > 0) {
                                h.subMenu.map(z => {
                                    z.isActive = false;
                                });
                            }
                        });
                    }
                });
            });
        });
        // set
        this.listMenu[i].isActive = true;
        this.listMenu[i].subMenu[j].isActive = true;
        this.listMenu[i].subMenu[j].subMenu[k].isActive = true;
        this.listMenu[i].subMenu[j].subMenu[k].subMenu[y].isActive = true;
        this.menuService.setStorage(this.listMenu);
        // redirect link
        // this.router.navigate([url]);
        this.changeUrlToSubforder(url);
    }

    private changeUrlToSubforder(url: string) {
        const currentUrl = location.pathname;
        const prefixUrlCurrents = currentUrl.split('/');
        const prefixUrlNexts = url.split('/');
        if (environment.production) {
            if (prefixUrlCurrents.includes(PrefixUrl.APTN) && prefixUrlNexts.includes(PrefixUrl.APTN)) {
                const newUrl = url.slice(PrefixUrl.APTN.length + 1);
                this.util.setScrollTop(true);
                this.router.navigate([newUrl]);
            } else if (!prefixUrlCurrents.includes(PrefixUrl.APTN) && !prefixUrlNexts.includes(PrefixUrl.APTN)) {
                this.util.setScrollTop(true);
                this.router.navigate([url]);
            } else {
                location.href = url;
            }
        } else {
            this.util.setScrollTop(true);
            if (prefixUrlNexts.includes(PrefixUrl.APTN)) {
                const newUrl = url.slice(PrefixUrl.APTN.length + 1);
                this.router.navigate([newUrl]);
            } else {
                this.router.navigate([url]);
            }
        }
    }
}
