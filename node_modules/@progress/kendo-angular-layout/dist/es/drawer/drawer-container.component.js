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
var DrawerContainerComponent = /** @class */ (function () {
    function DrawerContainerComponent(localizationService) {
        var _this = this;
        this.localizationService = localizationService;
        this.rtl = false;
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(DrawerContainerComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "overlayClass", {
        get: function () {
            return this.drawer.mode === 'overlay';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "miniClass", {
        get: function () {
            return this.drawer.mini;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "pushClass", {
        get: function () {
            return this.drawer.mode === 'push';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "isExpandedClass", {
        get: function () {
            return this.drawer.expanded;
        },
        enumerable: true,
        configurable: true
    });
    DrawerContainerComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    Object.defineProperty(DrawerContainerComponent.prototype, "overlay", {
        /**
         * @hidden
         */
        get: function () {
            return isPresent(this.drawer) &&
                this.drawer.expanded &&
                this.drawer.mode === 'overlay';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DrawerContainerComponent.prototype.closeDrawer = function () {
        if (this.overlay && this.drawer.autoCollapse) {
            this.drawer.toggle(false);
        }
    };
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
                    template: "\n        <div class=\"k-overlay\" *ngIf=\"overlay\" (click)=\"closeDrawer()\"></div>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerContainerComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    DrawerContainerComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-drawer-container',] }],
        overlayClass: [{ type: HostBinding, args: ['class.k-drawer-overlay',] }],
        miniClass: [{ type: HostBinding, args: ['class.k-drawer-mini',] }],
        pushClass: [{ type: HostBinding, args: ['class.k-drawer-push',] }],
        isExpandedClass: [{ type: HostBinding, args: ['class.k-drawer-expanded',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        drawer: [{ type: ContentChild, args: [DrawerComponent,] }]
    };
    return DrawerContainerComponent;
}());
export { DrawerContainerComponent };
