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
export class DrawerListComponent {
    constructor(drawerService, renderer, ngZone, changeDetector, element) {
        this.drawerService = drawerService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.element = element;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.initialSelection();
        this.initDomEvents();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    initialSelection() {
        /* Differentiates a user selected item */
        if (this.drawerService.selectedIndices.length === 0) {
            this.drawerService.initSelection();
        }
    }
    initDomEvents() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const nativeElement = this.element.nativeElement;
            this.subscriptions.add(this.renderer.listen(nativeElement, 'click', this.clickHandler.bind(this)));
            this.subscriptions.add(this.renderer.listen(nativeElement, 'keydown', this.keyDownHandler.bind(this)));
        });
    }
    clickHandler(e) {
        const itemIdx = this.getDrawerItemIndex(e.target);
        const item = this.items[itemIdx];
        if (!item) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        const args = {
            index: itemIdx,
            item: item,
            originalEvent: e
        };
        this.ngZone.run(() => {
            if (!this.drawerService.emit('select', args)) {
                this.drawerService.onSelect(itemIdx);
                this.changeDetector.detectChanges();
            }
        });
    }
    keyDownHandler(e) {
        const isEnterOrSpace = e.keyCode === Keys.Enter || e.keyCode === Keys.Space;
        if (!isEnterOrSpace) {
            return;
        }
        this.clickHandler(e);
        const link = nestedLink(this.element.nativeElement, ACTIVE_NESTED_LINK_SELECTOR);
        if (link) {
            link.click();
        }
        return false;
    }
    getDrawerItemIndex(target) {
        const item = closestItem(target, DRAWER_ITEM_INDEX, this.element.nativeElement);
        if (item) {
            return itemIndex(item, DRAWER_ITEM_INDEX);
        }
    }
}
DrawerListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoDrawerList]',
                template: `
        <ng-container *ngFor="let item of items; let idx = index">
            <li *ngIf="!item.separator" kendoDrawerItem
                class="k-drawer-item"
                [item]="item"
                [index]="idx"
                [mini]="mini"
                [expanded]="expanded"
                [itemTemplate]="itemTemplate"
                [attr.${DRAWER_ITEM_INDEX}]="idx"
                [ngClass]="item.cssClass"
                [ngStyle]="item.cssStyle"
                tabindex="0">
            </li>

            <li *ngIf="item.separator"
                class="k-drawer-item k-drawer-separator"
                [ngClass]="item.cssClass"
                [ngStyle]="item.cssStyle">
                &nbsp;
            </li>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
DrawerListComponent.ctorParameters = () => [
    { type: DrawerService },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
DrawerListComponent.propDecorators = {
    items: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    mini: [{ type: Input }],
    expanded: [{ type: Input }]
};
