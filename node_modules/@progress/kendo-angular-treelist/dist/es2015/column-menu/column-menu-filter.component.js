/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
/**
 * Represents the component for editing column filters in the TreeList that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-filter` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-filter/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export class ColumnMenuFilterComponent extends ColumnMenuItemBase {
    constructor(localization) {
        super();
        this.localization = localization;
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        this.expanded = false;
        /**
         * @hidden
         */
        this.actionsClass = 'k-columnmenu-actions';
    }
}
ColumnMenuFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-columnmenu-filter',
                template: `
        <kendo-treelist-columnmenu-item [text]="localization.get('filter')" icon="filter"
            [expanded]="expanded" (collapse)="collapse.emit()" (expand)="expand.emit()">
            <ng-template kendoTreeListColumnMenuItemContentTemplate>
                    <kendo-treelist-filter-menu-container
                        [column]="service.column"
                        [filter]="service.filter"
                        [actionsClass]="actionsClass"
                        (close)="close()">
                    </kendo-treelist-filter-menu-container>
                </ng-template>
        </kendo-treelist-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuFilterComponent.ctorParameters = () => [
    { type: LocalizationService }
];
ColumnMenuFilterComponent.propDecorators = {
    expand: [{ type: Output }],
    collapse: [{ type: Output }],
    expanded: [{ type: Input }]
};
