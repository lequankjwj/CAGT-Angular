/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drawer_service_1 = require("./drawer.service");
var util_1 = require("./util");
/**
 * @hidden
 */
var DrawerItemComponent = /** @class */ (function () {
    function DrawerItemComponent(drawer, element, renderer) {
        this.drawer = drawer;
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(DrawerItemComponent.prototype, "disabledClass", {
        get: function () {
            return this.item.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerItemComponent.prototype, "selectedClass", {
        get: function () {
            return this.drawer.selectedIndices.indexOf(this.index) >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerItemComponent.prototype, "label", {
        get: function () {
            return this.item.text ? this.item.text : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DrawerItemComponent.prototype.ngAfterViewInit = function () {
        var link = util_1.nestedLink(this.element.nativeElement, util_1.DRAWER_LINK_SELECTOR);
        if (link) {
            this.renderer.removeAttribute(link, 'tabindex');
        }
    };
    /**
     * @hidden
     */
    DrawerItemComponent.prototype.iconClasses = function (icon) {
        return "k-icon " + icon;
    };
    DrawerItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoDrawerItem]',
                    template: "\n        <ng-template *ngIf=\"itemTemplate; else defaultTemplate\"\n            [ngTemplateOutlet]=\"itemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-template>\n\n        <ng-template #defaultTemplate>\n            <ng-container *ngIf=\"expanded\">\n                <span [ngClass]=\"iconClasses(item.icon)\"></span>\n                <span class=\"k-item-text\">{{ item.text }}</span>\n            </ng-container>\n            <ng-container *ngIf=\"mini && !expanded\">\n                <span [ngClass]=\"iconClasses(item.icon)\"></span>\n            </ng-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerItemComponent.ctorParameters = function () { return [
        { type: drawer_service_1.DrawerService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 }
    ]; };
    DrawerItemComponent.propDecorators = {
        item: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.Input }],
        mini: [{ type: core_1.Input }],
        expanded: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.Input }],
        cssStyle: [{ type: core_1.Input }],
        disabledClass: [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }, { type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        selectedClass: [{ type: core_1.HostBinding, args: ['attr.aria-selected',] }, { type: core_1.HostBinding, args: ['class.k-state-selected',] }],
        label: [{ type: core_1.HostBinding, args: ['attr.aria-label',] }]
    };
    return DrawerItemComponent;
}());
exports.DrawerItemComponent = DrawerItemComponent;
