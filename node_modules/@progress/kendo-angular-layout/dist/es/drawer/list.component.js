/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subscription } from 'rxjs';
import { Component, ElementRef, Input, NgZone, Renderer2, TemplateRef, ChangeDetectorRef } from "@angular/core";
import { closestItem, itemIndex } from '../common/dom-queries';
import { DRAWER_ITEM_INDEX } from './models/constants';
import { DrawerService } from './drawer.service';
import { Keys } from '@progress/kendo-angular-common';
import { ACTIVE_NESTED_LINK_SELECTOR, nestedLink } from './util';
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
        this.subscriptions = new Subscription();
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
        var isEnterOrSpace = e.keyCode === Keys.Enter || e.keyCode === Keys.Space;
        if (!isEnterOrSpace) {
            return;
        }
        this.clickHandler(e);
        var link = nestedLink(this.element.nativeElement, ACTIVE_NESTED_LINK_SELECTOR);
        if (link) {
            link.click();
        }
        return false;
    };
    DrawerListComponent.prototype.getDrawerItemIndex = function (target) {
        var item = closestItem(target, DRAWER_ITEM_INDEX, this.element.nativeElement);
        if (item) {
            return itemIndex(item, DRAWER_ITEM_INDEX);
        }
    };
    DrawerListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoDrawerList]',
                    template: "\n        <ng-container *ngFor=\"let item of items; let idx = index\">\n            <li *ngIf=\"!item.separator\" kendoDrawerItem\n                class=\"k-drawer-item\"\n                [item]=\"item\"\n                [index]=\"idx\"\n                [mini]=\"mini\"\n                [expanded]=\"expanded\"\n                [itemTemplate]=\"itemTemplate\"\n                [attr." + DRAWER_ITEM_INDEX + "]=\"idx\"\n                [ngClass]=\"item.cssClass\"\n                [ngStyle]=\"item.cssStyle\"\n                tabindex=\"0\">\n            </li>\n\n            <li *ngIf=\"item.separator\"\n                class=\"k-drawer-item k-drawer-separator\"\n                [ngClass]=\"item.cssClass\"\n                [ngStyle]=\"item.cssStyle\">\n                &nbsp;\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerListComponent.ctorParameters = function () { return [
        { type: DrawerService },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    DrawerListComponent.propDecorators = {
        items: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        mini: [{ type: Input }],
        expanded: [{ type: Input }]
    };
    return DrawerListComponent;
}());
export { DrawerListComponent };
