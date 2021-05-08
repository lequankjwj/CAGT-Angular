/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, TemplateRef, HostBinding, ElementRef, Renderer2 } from "@angular/core";
import { DrawerService } from './drawer.service';
import { nestedLink, DRAWER_LINK_SELECTOR } from './util';
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
        var link = nestedLink(this.element.nativeElement, DRAWER_LINK_SELECTOR);
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
        { type: Component, args: [{
                    selector: '[kendoDrawerItem]',
                    template: "\n        <ng-template *ngIf=\"itemTemplate; else defaultTemplate\"\n            [ngTemplateOutlet]=\"itemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-template>\n\n        <ng-template #defaultTemplate>\n            <ng-container *ngIf=\"expanded\">\n                <span [ngClass]=\"iconClasses(item.icon)\"></span>\n                <span class=\"k-item-text\">{{ item.text }}</span>\n            </ng-container>\n            <ng-container *ngIf=\"mini && !expanded\">\n                <span [ngClass]=\"iconClasses(item.icon)\"></span>\n            </ng-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerItemComponent.ctorParameters = function () { return [
        { type: DrawerService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    DrawerItemComponent.propDecorators = {
        item: [{ type: Input }],
        index: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        mini: [{ type: Input }],
        expanded: [{ type: Input }],
        disabled: [{ type: Input }],
        cssClass: [{ type: Input }],
        cssStyle: [{ type: Input }],
        disabledClass: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] }],
        selectedClass: [{ type: HostBinding, args: ['attr.aria-selected',] }, { type: HostBinding, args: ['class.k-state-selected',] }],
        label: [{ type: HostBinding, args: ['attr.aria-label',] }]
    };
    return DrawerItemComponent;
}());
export { DrawerItemComponent };
