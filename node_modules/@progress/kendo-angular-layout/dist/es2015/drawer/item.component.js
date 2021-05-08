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
export class DrawerItemComponent {
    constructor(drawer, element, renderer) {
        this.drawer = drawer;
        this.element = element;
        this.renderer = renderer;
    }
    get disabledClass() {
        return this.item.disabled;
    }
    get selectedClass() {
        return this.drawer.selectedIndices.indexOf(this.index) >= 0;
    }
    get label() {
        return this.item.text ? this.item.text : null;
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        const link = nestedLink(this.element.nativeElement, DRAWER_LINK_SELECTOR);
        if (link) {
            this.renderer.removeAttribute(link, 'tabindex');
        }
    }
    /**
     * @hidden
     */
    iconClasses(icon) {
        return `k-icon ${icon}`;
    }
}
DrawerItemComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoDrawerItem]',
                template: `
        <ng-template *ngIf="itemTemplate; else defaultTemplate"
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }">
        </ng-template>

        <ng-template #defaultTemplate>
            <ng-container *ngIf="expanded">
                <span [ngClass]="iconClasses(item.icon)"></span>
                <span class="k-item-text">{{ item.text }}</span>
            </ng-container>
            <ng-container *ngIf="mini && !expanded">
                <span [ngClass]="iconClasses(item.icon)"></span>
            </ng-container>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
DrawerItemComponent.ctorParameters = () => [
    { type: DrawerService },
    { type: ElementRef },
    { type: Renderer2 }
];
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
