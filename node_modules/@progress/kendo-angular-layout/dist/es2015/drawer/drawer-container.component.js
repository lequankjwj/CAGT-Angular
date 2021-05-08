/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ContentChild } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { DrawerComponent } from './drawer.component';
import { isPresent } from '../common/util';
/**
 * Serves as a container for the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}) and its content.
 */
export class DrawerContainerComponent {
    constructor(localizationService) {
        this.localizationService = localizationService;
        this.rtl = false;
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
    }
    get hostClass() {
        return true;
    }
    get overlayClass() {
        return this.drawer.mode === 'overlay';
    }
    get miniClass() {
        return this.drawer.mini;
    }
    get pushClass() {
        return this.drawer.mode === 'push';
    }
    get isExpandedClass() {
        return this.drawer.expanded;
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    get overlay() {
        return isPresent(this.drawer) &&
            this.drawer.expanded &&
            this.drawer.mode === 'overlay';
    }
    /**
     * @hidden
     */
    closeDrawer() {
        if (this.overlay && this.drawer.autoCollapse) {
            this.drawer.toggle(false);
        }
    }
}
DrawerContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-drawer-container',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.drawer.container'
                    }
                ],
                template: `
        <div class="k-overlay" *ngIf="overlay" (click)="closeDrawer()"></div>
        <ng-content></ng-content>
    `
            },] },
];
/** @nocollapse */
DrawerContainerComponent.ctorParameters = () => [
    { type: LocalizationService }
];
DrawerContainerComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-drawer-container',] }],
    overlayClass: [{ type: HostBinding, args: ['class.k-drawer-overlay',] }],
    miniClass: [{ type: HostBinding, args: ['class.k-drawer-mini',] }],
    pushClass: [{ type: HostBinding, args: ['class.k-drawer-push',] }],
    isExpandedClass: [{ type: HostBinding, args: ['class.k-drawer-expanded',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    drawer: [{ type: ContentChild, args: [DrawerComponent,] }]
};
