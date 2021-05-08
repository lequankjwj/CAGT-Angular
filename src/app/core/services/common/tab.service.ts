import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from './util.service';
import { UrlConstant } from '@core/constants/url.constant';

export interface ITab {
    name: string;
    url: string;
    selected?: boolean;
    isActive?: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class TabService {
    private tabs: ITab[] = [];
    private keyTab = '_key_tab';

    private messageTab = new BehaviorSubject(null);
    sharedTabs = this.messageTab.asObservable();
    constructor(private router: Router, private util: UtilService) {}

    /**
     * Adds tab
     * @param tab
     */
    addTab(tab: ITab) {
        // set is active
        tab.isActive = true;

        // find position tab in tabs
        const position = this.tabs.findIndex(m => m.url === tab.url);
        if (position < 0) {
            this.tabs.map(item => (item.selected = false));

            if (this.tabs.length < 2) {
                this.tabs.push(tab);
                this.tabs[this.tabs.length - 1].selected = true;
            } else {
                this.tabs.splice(1, 0, tab);
                this.tabs[1].selected = true;
            }
            // set localStorage
            this.setLocalStorage(this.tabs);

            // sync
            this.nextMessageTab();
        } else {
            this.tabs.map((item, index) => {
                this.tabs[index].selected = index === position;
            });
            // set localStorage
            this.setLocalStorage(this.tabs);

            // sync
            this.nextMessageTab();
        }

        this.util.setScrollTop(true);
    }

    /**
     * Removes tab
     * @param tab
     */
    removeTab(tab: ITab) {
        const position = this.tabs.findIndex(m => m.url === tab.url);
        if (position > -1) {
            this.tabs.splice(position, 1);
        }

        // set selected
        if (this.tabs.length > 0 && this.tabs.filter(m => m.selected === true).length < 1) {
            this.tabs[this.tabs.length - 1].selected = true;
            // this.router.navigate([this.tabs[this.tabs.length - 1].url]);
        }

        // set localStorage
        this.setLocalStorage(this.tabs);

        // sync
        this.nextMessageTab();
    }

    /**
     * Sets selected tab
     * @param index
     */
    setSelectedTab(index) {
        this.tabs.map(item => (item.selected = false));
        this.tabs[index].selected = true;
        // set localStorage
        this.setLocalStorage(this.tabs);
    }

    getTabs() {
        const local = this.getLocalStorage();
        if (local && local.length > 0) {
            this.tabs = local;

            if (!this.tabs.map(x => x.url).includes(UrlConstant.ROUTE.DASHBOARD)) {
                // set tab default
                this.tabs.unshift({
                    isActive: true,
                    name: 'Dashboard',
                    selected: false,
                    url: UrlConstant.ROUTE.DASHBOARD,
                });
            }

            // map data
            this.tabs.map(x => (x.selected ? (x.isActive = true) : (x.isActive = false)));
            return local;
        }

        if (this.tabs.length < 1) {
            this.tabs.push({
                isActive: true,
                name: 'Dashboard',
                selected: true,
                url: UrlConstant.ROUTE.DASHBOARD,
            });
        }
        return this.tabs;
    }

    /**
     * Gets tab selected
     * @returns
     */
    getTabSelected() {
        const index = this.tabs.findIndex(m => m.selected);
        if (index < 0) {
            return 0;
        }
        return this.tabs.findIndex(m => m.selected);
    }

    /**
     * Sets local storage
     * @param data
     */
    setLocalStorage(data) {
        localStorage.setItem(this.keyTab, JSON.stringify(data));

        // change color
        setTimeout(() => {
            const themeColor = localStorage.getItem('theme-color');
            if (themeColor) {
                const color = themeColor.split('-')[2];
                this.sendEventToInsideIframe(color);
            }
        }, 500);
    }

    /**
     * Gets local storage
     * @returns local storage
     */
    getLocalStorage(): ITab[] {
        const local = localStorage.getItem(this.keyTab);
        if (local === undefined || local === null) {
            return [];
        }
        return JSON.parse(local);
    }

    /**
     * Removes local storage
     */
    removeLocalStorage() {
        localStorage.removeItem(this.keyTab);
    }

    nextMessageTab() {
        this.messageTab.next(this.tabs);
    }

    /**
     * Open new tab from inside iframe
     */
    newTabInIframe(title: string, uri: string) {
        window.parent.postMessage(
            {
                type: 'openNewTab',
                name: title,
                url: uri,
            },
            '*'
        );
    }

    /**
     * close current tab inactive
     * @param uri
     */
    closeTab(uri: string) {
        window.parent.postMessage(
            {
                type: 'closeTab',
                url: uri,
            },
            '*'
        );
    }

    sendEventToInsideIframe(className) {
        window.postMessage(
            {
                type: 'changeClass',
                class: className,
            },
            '*'
        );
    }
}
