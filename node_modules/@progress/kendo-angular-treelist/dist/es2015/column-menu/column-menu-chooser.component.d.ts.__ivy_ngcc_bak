/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
/**
 * Represents the component for selecting columns in the TreeList that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-chooser` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-chooser/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export declare class ColumnMenuChooserComponent extends ColumnMenuItemBase {
    localization: LocalizationService;
    private columnInfoService;
    private changeDetector;
    /**
     * Fires when the content is expanded.
     */
    expand: EventEmitter<any>;
    /**
     * Fires when the content is collapsed.
     */
    collapse: EventEmitter<any>;
    /**
     * Specifies if the content is expanded.
     */
    expanded: boolean;
    /**
     * @hidden
     */
    actionsClass: string;
    readonly columns: any;
    constructor(localization: LocalizationService, columnInfoService: ColumnInfoService, changeDetector: ChangeDetectorRef);
    /**
     * @hidden
     */
    onApply(changed: any[]): void;
}
