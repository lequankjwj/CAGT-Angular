/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var drawer_component_1 = require("./drawer.component");
var util_1 = require("../common/util");
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
            return util_1.isPresent(this.drawer) &&
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-drawer-container',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.drawer.container'
                        }
                    ],
                    template: "\n        <div class=\"k-overlay\" *ngIf=\"overlay\" (click)=\"closeDrawer()\"></div>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerContainerComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    DrawerContainerComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-container',] }],
        overlayClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-overlay',] }],
        miniClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-mini',] }],
        pushClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-push',] }],
        isExpandedClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-expanded',] }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        drawer: [{ type: core_1.ContentChild, args: [drawer_component_1.DrawerComponent,] }]
    };
    return DrawerContainerComponent;
}());
exports.DrawerContainerComponent = DrawerContainerComponent;
