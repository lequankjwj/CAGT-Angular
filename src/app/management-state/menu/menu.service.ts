import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UrlConstant} from '@core/constants/url.constant';
import {ApiService} from '@core/data-services/api.service';
import {IMenuSidebar} from '@core/models/common/menu-sidebar.model';
import {catchError, tap} from 'rxjs/operators';
import {MenuStore} from './menu.store';
import {setLoading} from '@datorama/akita';
import {of} from 'rxjs';
import {MenuQuery} from './menu.query';
import {SecurityUtil} from '@core/utils/security';
import {EmitEvent, EventBus, EventBusService} from '@core/services/common';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private keyStorageMenu = '_key_menu';
    private menuVersionBefores: IMenuSidebar[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: MenuStore,
        private apiService: ApiService,
        private menuQuery: MenuQuery,
        private eventBus: EventBusService
    ) {
    }

    setStorage(menus) {
        localStorage.setItem(this.keyStorageMenu, SecurityUtil.set(JSON.stringify(menus)));
    }

    getMenu(isLogin) {
        this.apiService
            .post(UrlConstant.API.ACL_ACCOUNT + '/GetMenuPage', {})
            .pipe(
                setLoading(this.store),
                tap(res => {
                    if (res.result) {
                        if (isLogin) {
                            this.menuVersionBefores = [];
                            this.setStorage(this.setActiveMenu(res.result));
                            this.eventBus.emit(new EmitEvent(EventBus.MenuState, true));
                        } else {
                            const menus = this.menuQuery.getStorage();
                            if (menus && menus.length > 0) {
                                this.menuVersionBefores = menus;
                            }

                            this.setStorage(this.setActiveMenu(res.result));
                            this.eventBus.emit(new EmitEvent(EventBus.MenuState, true));
                        }
                    }
                }),
                catchError(error => {
                    this.store.setError(error);
                    return of(error);
                }),
            )
            .subscribe();
    }

    updateData(data: IMenuSidebar[]) {
        const body = {
            menu: data,
        };
        this.setStorage(data);
        // this.store.update(state => {
        //     return {
        //         ...state,
        //         ...body,
        //     };
        // });
    }

    private setActiveMenu(listMenu) {
        const currentURL = location.pathname;
        if (this.menuVersionBefores.length > 0) {
            listMenu.map((menu, index1) => {
                menu.subMenu.map((item, index2) => {
                    item.subMenu.map((x, index3) => {
                        if (this.menuVersionBefores[index1].subMenu[index2].subMenu[index3].isActive) {
                            if (x.link === currentURL) {
                                menu.isActive = true;
                                item.isActive = true;
                                x.isActive = true;
                            } else {
                                x.isActive = false;
                            }
                        } else {
                            if (x.link === currentURL) {
                                menu.isActive = true;
                                item.isActive = true;
                                x.isActive = true;
                            } else {
                                x.isActive = false;
                            }
                        }
                        if (x.subMenu.length > 0) {
                            x.subMenu.map((y, index4) => {
                                if (this.menuVersionBefores[index1].subMenu[index2].subMenu[index3].subMenu[index4].isActive) {
                                    if (y.link === currentURL) {
                                        menu.isActive = true;
                                        item.isActive = true;
                                        x.isActive = true;
                                        y.isActive = true;
                                    } else {
                                        y.isActive = false;
                                    }
                                } else {
                                    if (y.link === currentURL) {
                                        menu.isActive = true;
                                        item.isActive = true;
                                        x.isActive = true;
                                        y.isActive = true;
                                    } else {
                                        y.isActive = false;
                                    }
                                }
                            });
                        }
                    });
                });
            });
        } else {
            listMenu.map(menu => {
                menu.isActive = false;
                menu.subMenu.map(item => {
                    item.isActive = false;
                    item.subMenu.map(x => {
                        x.isActive = false;
                        if (x.subMenu.length > 0) {
                            x.subMenu.map(y => {
                                y.isActive = false;
                                if (y.subMenu.length > 0) {
                                    y.subMenu.map(z => {
                                        z.isActive = false;
                                    });
                                }
                            });
                        }
                    });
                });
            });
        }
        return listMenu;
    }
}
