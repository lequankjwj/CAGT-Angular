import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuSidebar } from '@core/models/common/menu-sidebar.model';
import { Query } from '@datorama/akita';
import { MenuState, MenuStore } from './menu.store';
import { UrlConstant } from '@core/constants/url.constant';
import { SecurityUtil } from '@core/utils/security';

@Injectable({ providedIn: 'root' })
export class MenuQuery extends Query<MenuState> {
    all$ = this.select('menu');
    private keyStorageMenu = '_key_menu';

    constructor(protected store: MenuStore, private http: HttpClient, private router: Router) {
        super(store);
    }

    getStorage(): IMenuSidebar[] {
        try {
            return JSON.parse(SecurityUtil.get(localStorage.getItem(this.keyStorageMenu)));
        } catch (e) {
            return [];
        }
    }


    getListOptionWithCurrentUrl() {
        const currentURL = this.router.url;
        const listData = this.checkList(this.getStorage(), currentURL);
        if (listData.length > 0) {
            return this.getValueType(listData[0]);
        }
        return [];
    }

    /**
     *
     * @param currentUrl
     */
    checkLinkUserHasAccess(currentUrl: string) {
        const menus = this.getStorage();
        const pers = this.checkList(menus, currentUrl);

        if (pers.length > 0) {
            return !!this.getLinkValue(pers[0]);
        }
        return false;
    }

    getListPermissionWithCurrentUrl() {
        const menus = this.getStorage();
        const currentUrl = location.pathname;
        const pers = this.checkList(menus, currentUrl);

        if (pers.length > 0) {
            return this.getValueType(pers[0]);
        }
        return [];
    }

    getPermissionWithCurrentUrl(menus) {
        const currentURL = location.pathname;
        const listData = this.checkList(menus, currentURL);
        if (listData.length > 0) {
            return this.getValueType(listData[0]);
        }
        return [];
    }

    getLinkValue(listData: IMenuSidebar) {
        if (listData.subMenu.length === 0) {
            return listData.link;
        }
        return this.getLinkValue(listData.subMenu[0]);
    }

    getValueType(listData: IMenuSidebar) {
        if (listData.subMenu.length === 0) {
            return listData.types;
        }
        return this.getValueType(listData.subMenu[0]);
    }

    getTitleWithCurrentUrl(): string {
        const menus = this.getStorage();
        const currentURL = this.router.url;
        if (menus && menus.length > 0) {
            const url = currentURL.split('?');
            const listData = this.checkList(menus, url[0]);
            if (listData.length > 0) {
                return this.getDescription(listData[0]);
            }
        }

        if (currentURL === UrlConstant.ROUTE.FORBIDEN) {
            return 'Không có quyền truy cập';
        }
        return '';
    }

    getDescription(listData: IMenuSidebar) {
        if (listData.subMenu.length === 0) {
            return listData.title;
        }
        return this.getDescription(listData.subMenu[0]);
    }

    checkList(items: IMenuSidebar[], url: string): any[] {
        return items.reduce((acc: IMenuSidebar[], item) => {
            if (this.contains(item.link, url) && item.subMenu.length === 0) {
                acc.push(item);
            } else if (item.subMenu && item.subMenu.length > 0) {
                const newItems = this.checkList(item.subMenu, url);
                if (newItems.length > 0) {
                    acc.push({
                        css: item.css,
                        cssBadge: item.cssBadge,
                        title: item.title,
                        link: item.link,
                        types: item.types,
                        isActive: item.isActive,
                        subMenu: newItems,
                        options: item.options,
                    });
                }
            }
            return acc;
        }, []);
    }

    contains(link: string, url: string): boolean {
        if (link.charAt(0) !== '/') {
            link = '/' + link;
        }
        return link.toLowerCase().indexOf(url.toLowerCase()) >= 0;
    }
}
