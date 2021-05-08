/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, TemplateRef, HostBinding } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SinglePopupService } from '../common/single-popup.service';
import { ColumnMenuService } from './column-menu.service';
import { filtersByField } from '../filtering/base-filter-cell.component';
import { hasFilter, hasSort, hasLock, hasColumnChooser } from './utils';
const POPUP_CLASS = 'k-grid-columnmenu-popup';
/**
 * Represents the [column menu]({% slug columnmenu_treelist %}) component.
 */
export class ColumnMenuComponent {
    constructor(popupService, localization, service) {
        this.popupService = popupService;
        this.localization = localization;
        this.service = service;
        /**
         * @hidden
         */
        this.standalone = true;
        /**
         * The settings for the Column Menu.
         */
        this.settings = {};
        /**
         * @hidden
         */
        this.sortable = true;
        /**
         * @hidden
         */
        this.expandedFilter = false;
        /**
         * @hidden
         */
        this.expandedColumns = false;
        this.closeSubscription = service.closeMenu.subscribe(this.close.bind(this));
    }
    /**
     * @hidden
     */
    get isActive() {
        return (this.hasFilter && filtersByField(this.filter, this.column.field).length > 0) ||
            (!this.sortable && this.hasSort && this.sort.find(descriptor => descriptor.field === this.column.field));
    }
    /**
     * @hidden
     */
    get hasFilter() {
        return hasFilter(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasSort() {
        return hasSort(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasColumnChooser() {
        return hasColumnChooser(this.settings);
    }
    /**
     * @hidden
     */
    get hasLock() {
        return hasLock(this.settings, this.column);
    }
    ngOnChanges() {
        this.service.column = this.column;
        this.service.sort = this.sort;
        this.service.filter = this.filter;
        this.service.sortable = this.sortable;
    }
    ngOnDestroy() {
        this.close();
        this.closeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    toggle(e, anchor, template) {
        e.preventDefault();
        this.expandedFilter = !this.hasColumnChooser;
        this.expandedColumns = !this.hasFilter;
        this.popupRef = this.popupService.open(anchor, template, this.popupRef, POPUP_CLASS);
    }
    /**
     * @hidden
     */
    close() {
        this.popupService.destroy();
        this.popupRef = null;
    }
    /**
     * @hidden
     */
    onColumnsExpand() {
        this.expandedColumns = true;
        this.expandedFilter = false;
    }
    /**
     * @hidden
     */
    onFilterExpand() {
        this.expandedFilter = true;
        this.expandedColumns = false;
    }
}
ColumnMenuComponent.decorators = [
    { type: Component, args: [{
                providers: [ColumnMenuService],
                selector: 'kendo-treelist-column-menu',
                template: `
        <a #anchor
            class="k-grid-column-menu k-grid-filter"
            [ngClass]="{ 'k-state-active': isActive }"
            (click)="toggle($event, anchor, template)"
            href="#"
            tabindex="-1"
            [attr.title]="localization.get('columnMenu')">
            <span class="k-icon k-i-more-vertical"></span>
        </a>
        <ng-template #template>
            <ng-container [ngTemplateOutlet]="column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate"
                          [ngTemplateOutletContext]="{ service: service, column: column }">
            </ng-container>
        </ng-template>
        <ng-template #defaultTemplate>
            <kendo-treelist-columnmenu-sort *ngIf="hasSort" [service]="service">
            </kendo-treelist-columnmenu-sort>
            <kendo-treelist-columnmenu-lock *ngIf="hasLock" [service]="service">
            </kendo-treelist-columnmenu-lock>
            <kendo-treelist-columnmenu-chooser *ngIf="hasColumnChooser" [service]="service"
                [expanded]="expandedColumns" (expand)="onColumnsExpand()">
            </kendo-treelist-columnmenu-chooser>
            <kendo-treelist-columnmenu-filter *ngIf="hasFilter" [service]="service"
                [expanded]="expandedFilter" (expand)="onFilterExpand()">
            </kendo-treelist-columnmenu-filter>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ColumnMenuComponent.ctorParameters = () => [
    { type: SinglePopupService },
    { type: LocalizationService },
    { type: ColumnMenuService }
];
ColumnMenuComponent.propDecorators = {
    standalone: [{ type: HostBinding, args: ['class.k-grid-column-menu-standalone',] }, { type: Input }],
    column: [{ type: Input }],
    settings: [{ type: Input }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    sortable: [{ type: Input }],
    columnMenuTemplate: [{ type: Input }]
};
