/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var dom_queries_1 = require("../common/dom-queries");
var constants_1 = require("./models/constants");
var drawer_service_1 = require("./drawer.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var util_1 = require("./util");
/**
 * @hidden
 */
var DrawerListComponent = /** @class */ (function () {
    function DrawerListComponent(drawerService, renderer, ngZone, changeDetector, element) {
        this.drawerService = drawerService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.element = element;
        this.subscriptions = new rxjs_1.Subscription();
    }
    DrawerListComponent.prototype.ngOnInit = function () {
        this.initialSelection();
        this.initDomEvents();
    };
    DrawerListComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    DrawerListComponent.prototype.initialSelection = function () {
        /* Differentiates a user selected item */
        if (this.drawerService.selectedIndices.length === 0) {
            this.drawerService.initSelection();
        }
    };
    DrawerListComponent.prototype.initDomEvents = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var nativeElement = _this.element.nativeElement;
            _this.subscriptions.add(_this.renderer.listen(nativeElement, 'click', _this.clickHandler.bind(_this)));
            _this.subscriptions.add(_this.renderer.listen(nativeElement, 'keydown', _this.keyDownHandler.bind(_this)));
        });
    };
    DrawerListComponent.prototype.clickHandler = function (e) {
        var _this = this;
        var itemIdx = this.getDrawerItemIndex(e.target);
        var item = this.items[itemIdx];
        if (!item) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        var args = {
            index: itemIdx,
            item: item,
            originalEvent: e
        };
        this.ngZone.run(function () {
            if (!_this.drawerService.emit('select', args)) {
                _this.drawerService.onSelect(itemIdx);
                _this.changeDetector.detectChanges();
            }
        });
    };
    DrawerListComponent.prototype.keyDownHandler = function (e) {
        var isEnterOrSpace = e.keyCode === kendo_angular_common_1.Keys.Enter || e.keyCode === kendo_angular_common_1.Keys.Space;
        if (!isEnterOrSpace) {
            return;
        }
        this.clickHandler(e);
        var link = util_1.nestedLink(this.element.nativeElement, util_1.ACTIVE_NESTED_LINK_SELECTOR);
        if (link) {
            link.click();
        }
        return false;
    };
    DrawerListComponent.prototype.getDrawerItemIndex = function (target) {
        var item = dom_queries_1.closestItem(target, constants_1.DRAWER_ITEM_INDEX, this.element.nativeElement);
        if (item) {
            return dom_queries_1.itemIndex(item, constants_1.DRAWER_ITEM_INDEX);
        }
    };
    DrawerListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoDrawerList]',
                    template: "\n        <ng-container *ngFor=\"let item of items; let idx = index\">\n            <li *ngIf=\"!item.separator\" kendoDrawerItem\n                class=\"k-drawer-item\"\n                [item]=\"item\"\n                [index]=\"idx\"\n                [mini]=\"mini\"\n                [expanded]=\"expanded\"\n                [itemTemplate]=\"itemTemplate\"\n                [attr." + constants_1.DRAWER_ITEM_INDEX + "]=\"idx\"\n                [ngClass]=\"item.cssClass\"\n                [ngStyle]=\"item.cssStyle\"\n                tabindex=\"0\">\n            </li>\n\n            <li *ngIf=\"item.separator\"\n                class=\"k-drawer-item k-drawer-separator\"\n                [ngClass]=\"item.cssClass\"\n                [ngStyle]=\"item.cssStyle\">\n                &nbsp;\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerListComponent.ctorParameters = function () { return [
        { type: drawer_service_1.DrawerService },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.ElementRef }
    ]; };
    DrawerListComponent.propDecorators = {
        items: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.Input }],
        mini: [{ type: core_1.Input }],
        expanded: [{ type: core_1.Input }]
    };
    return DrawerListComponent;
}());
exports.DrawerListComponent = DrawerListComponent;
