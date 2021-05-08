import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '@core/services/common/theme.service';
import { IMenuSidebar } from '@core/models/common/menu-sidebar.model';
import { MenuQuery } from '@management-state/menu/menu.query';
import { MenuService } from '@management-state/menu/menu.service';
import { SurveyService } from '@management-state/survey/survey.service';
import { delay } from 'rxjs/operators';
import { EventBus, EventBusService, UtilService } from '@core/services/common';
import { Subscription } from 'rxjs';
import { environment } from '@env/environment';
import { LocalStorageUtil } from '@core/utils/localstorage';
import {AppConfig} from '@core/config/app.config';

declare let mLayout: any;
const PrefixUrl = {
    APTN: 'APTN',
};
@Component({
    selector: 'app-aside-nav',
    templateUrl: './aside-nav.component.html',
    styleUrls: ['./aside-nav.component.css'],
})
export class AsideNavComponent implements OnInit, OnDestroy, AfterViewInit {
    listMenu: IMenuSidebar[] = [];

    opened = LocalStorageUtil.getStateSidebar();

    colors = ['default', 'blue', 'green', 'red'];

    eventbusSub: Subscription;

    isLeftMenu = AppConfig.settings.menu?.left ?? true;

    constructor(
        private themeService: ThemeService,
        private util: UtilService,
        private router: Router,
        private menuQuery: MenuQuery,
        private menuService: MenuService,
        private surveyService: SurveyService,
        private eventBus: EventBusService
    ) {}

    ngOnInit(): void {
        this.listMenu = this.menuQuery.getStorage();
        if (this.listMenu && this.listMenu.length > 0) {
            
        }

        this.themeService.loadColor();

        // get value
        this.eventbusSub = this.eventBus.on(EventBus.MenuState, state => {
            if (state) {
                this.listMenu = this.menuQuery.getStorage();
            }
        });
    }

    ngOnDestroy() {
        if (this.eventbusSub) {
            this.eventbusSub.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        mLayout.initAside();
    }

    /**
     * Change Url Node Parent
     * @param url
     * @param name
     * @param i
     * @param j
     */
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

    trackByFunction(index, item) {
        return index;
    }

    /**
     * Changes theme color
     * @param color
     */
    changeThemeColor(color) {
        this.themeService.setColor(color);
    }

    showMenu() {
        this.opened = !this.opened;
        LocalStorageUtil.setStateSidebar(this.opened);
        this.themeService.toggleSidebar(this.opened);
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
