/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
/**
 * Represents the component for selecting columns in the TreeList. To enable the user to show or hide columns,
 * add the component inside a [`ToolbarTemplate`]({% slug api_treelist_toolbartemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/chooser-toolbar/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export declare class ColumnChooserComponent implements OnDestroy {
    localization: LocalizationService;
    private columnInfoService;
    private popupService;
    private ngZone;
    private renderer;
    private changeDetector;
    /**
     * Specifies if the changes in the visibility of the column will be immediately applied.
     */
    autoSync: boolean;
    /**
     * Specifies if all columns can be hidden.
     */
    allowHideAll: boolean;
    readonly columns: any[];
    private popupRef;
    private closeClick;
    constructor(localization: LocalizationService, columnInfoService: ColumnInfoService, popupService: PopupService, ngZone: NgZone, renderer: Renderer2, changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggle(anchor: any, template: any): void;
    /**
     * @hidden
     */
    onApply(changed: any[]): void;
    /**
     * @hidden
     */
    onChange(changed: any[]): void;
    private close;
    private detachClose;
}
