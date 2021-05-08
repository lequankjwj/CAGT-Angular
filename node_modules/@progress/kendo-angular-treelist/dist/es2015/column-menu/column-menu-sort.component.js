/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SortService } from '../common/sort.service';
import { normalize } from '../columns/sort-settings';
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
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
export class ColumnMenuSortComponent extends ColumnMenuItemBase {
    constructor(localization, sortService) {
        super();
        this.localization = localization;
        this.sortService = sortService;
    }
    get sortedAsc() {
        const descriptor = this.descriptor;
        return descriptor && (!descriptor.dir || descriptor.dir === 'asc');
    }
    get sortedDesc() {
        const descriptor = this.descriptor;
        return descriptor && descriptor.dir === 'desc';
    }
    /**
     * @hidden
     */
    toggleSort(dir) {
        const field = this.service.column.field;
        const { mode, allowUnsort } = normalize(this.service.sortable);
        const descriptor = this.descriptor;
        const sort = mode === 'multiple' ? this.service.sort.filter(s => s.field !== field) : [];
        if (descriptor && descriptor.dir === dir) {
            if (!allowUnsort) {
                return;
            }
        }
        else {
            sort.push({ field, dir });
        }
        this.sortService.sort(sort);
        this.close();
    }
    get descriptor() {
        return [].concat(this.service.sort || []).find(s => s.field === this.service.column.field);
    }
}
ColumnMenuSortComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-columnmenu-sort',
                template: `
        <kendo-treelist-columnmenu-item [text]="localization.get('sortAscending')"
            icon="sort-asc-sm" (itemClick)="toggleSort('asc')" [selected]="sortedAsc">
        </kendo-treelist-columnmenu-item>
        <kendo-treelist-columnmenu-item [text]="localization.get('sortDescending')"
            icon="sort-desc-sm" (itemClick)="toggleSort('desc')" [selected]="sortedDesc">
        </kendo-treelist-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuSortComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: SortService }
];
