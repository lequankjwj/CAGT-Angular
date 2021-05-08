/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { ColumnBase } from './column-base';
import { isPresent } from '../utils';
import { FilterCellTemplateDirective } from '../filtering/cell/filter-cell-template.directive';
import { FilterMenuTemplateDirective } from '../filtering/menu/filter-menu-template.directive';
import { OptionChangesService } from '../common/option-changes.service';
/**
 * @hidden
 */
export function isColumnComponent(column) {
    return isPresent(column.field);
}
/**
 * Represents the columns of the [Angular TreeList]({% slug getstarted_treelist %}).
 *
 * {% meta height:470 %}
 * {% embed_file basic-usage/app.component.ts preview %}
 * {% embed_file basic-usage/app.module.ts %}
 * {% embed_file basic-usage/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export class ColumnComponent extends ColumnBase {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        this.sortable = true;
        /**
         * Defines the editor type ([see example]({% slug editing_reactive_forms_treelist %}#toc-setup)).
         * Used when the column enters the edit mode. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" editor="numeric">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.editor = 'text';
        /**
         * Defines the filter type that is displayed inside the filter row. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" filter="numeric">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.filter = 'text';
        /**
         * Defines if a filter UI will be displayed for this column. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" [filterable]="false">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.filterable = true;
        /**
         * Defines whether the column is editable. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" [editable]="false">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.editable = true;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
    get editTemplateRef() {
        return this.editTemplate ? this.editTemplate.templateRef : undefined;
    }
    get filterCellTemplateRef() {
        return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
    }
    get filterMenuTemplateRef() {
        return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
    }
    get displayTitle() {
        return this.title === undefined ? this.field : this.title;
    }
    /**
     * @hidden
     */
    get isEditable() {
        return this.editable !== false;
    }
}
ColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnComponent)
                    }
                ],
                selector: 'kendo-treelist-column',
                template: ``
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
];
ColumnComponent.propDecorators = {
    expandable: [{ type: Input }],
    field: [{ type: Input }],
    format: [{ type: Input }],
    sortable: [{ type: Input }],
    editor: [{ type: Input }],
    filter: [{ type: Input }],
    filterable: [{ type: Input }],
    editable: [{ type: Input }],
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }],
    editTemplate: [{ type: ContentChild, args: [EditTemplateDirective,] }],
    filterCellTemplate: [{ type: ContentChild, args: [FilterCellTemplateDirective,] }],
    filterMenuTemplate: [{ type: ContentChild, args: [FilterMenuTemplateDirective,] }]
};
