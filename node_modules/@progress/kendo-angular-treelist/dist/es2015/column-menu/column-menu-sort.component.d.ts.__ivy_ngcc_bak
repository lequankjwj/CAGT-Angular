/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SortService } from '../common/sort.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
/**
 * Represents a column-menu item for sorting TreeList columns that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 * Allows the user to sort the column.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-sort` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-sort/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export declare class ColumnMenuSortComponent extends ColumnMenuItemBase {
    localization: LocalizationService;
    protected sortService: SortService;
    constructor(localization: LocalizationService, sortService: SortService);
    readonly sortedAsc: boolean;
    readonly sortedDesc: boolean;
    /**
     * @hidden
     */
    toggleSort(dir: string): void;
    private readonly descriptor;
}
