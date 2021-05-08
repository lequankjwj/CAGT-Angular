/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, OnChanges, OnDestroy } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SinglePopupService } from '../common/single-popup.service';
import { ColumnMenuService } from './column-menu.service';
import { ColumnMenuSettings } from './column-menu-settings.interface';
/**
 * Represents the [column menu]({% slug columnmenu_treelist %}) component.
 */
export declare class ColumnMenuComponent implements OnChanges, OnDestroy {
    protected popupService: SinglePopupService;
    localization: LocalizationService;
    service: ColumnMenuService;
    /**
     * @hidden
     */
    standalone: boolean;
    /**
     * The TreeList column instance to control with the menu.
     */
    column: any;
    /**
     * The settings for the Column Menu.
     */
    settings: ColumnMenuSettings;
    /**
     * The descriptors by which the data will be sorted.
     * Typically bound to the same value as [TreeListComponent.sort]({% slug api_treelist_treelistcomponent %}#toc-sort).
     */
    sort: any;
    /**
     * The descriptor by which the data will be filtered.
     * Typically bound to the same value as [TreeListComponent.filter]({% slug api_treelist_treelistcomponent %}#toc-filter).
     */
    filter: any;
    /**
     * @hidden
     */
    sortable: any;
    /**
     * @hidden
     */
    columnMenuTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    expandedFilter: boolean;
    /**
     * @hidden
     */
    expandedColumns: boolean;
    private popupRef;
    private closeSubscription;
    constructor(popupService: SinglePopupService, localization: LocalizationService, service: ColumnMenuService);
    /**
     * @hidden
     */
    readonly isActive: boolean;
    /**
     * @hidden
     */
    readonly hasFilter: boolean;
    /**
     * @hidden
     */
    readonly hasSort: boolean;
    /**
     * @hidden
     */
    readonly hasColumnChooser: boolean;
    /**
     * @hidden
     */
    readonly hasLock: boolean;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggle(e: any, anchor: any, template: any): void;
    /**
     * @hidden
     */
    close(): void;
    /**
     * @hidden
     */
    onColumnsExpand(): void;
    /**
     * @hidden
     */
    onFilterExpand(): void;
}
