/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var ColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnComponent, _super);
    function ColumnComponent(parent, optionChanges) {
        var _this = _super.call(this, parent, optionChanges) || this;
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        _this.sortable = true;
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
        _this.editor = 'text';
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
        _this.filter = 'text';
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
        _this.filterable = true;
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
        _this.editable = true;
        return _this;
    }
    Object.defineProperty(ColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "editTemplateRef", {
        get: function () {
            return this.editTemplate ? this.editTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterCellTemplateRef", {
        get: function () {
            return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterMenuTemplateRef", {
        get: function () {
            return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "displayTitle", {
        get: function () {
            return this.title === undefined ? this.field : this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "isEditable", {
        /**
         * @hidden
         */
        get: function () {
            return this.editable !== false;
        },
        enumerable: true,
        configurable: true
    });
    ColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnComponent; })
                        }
                    ],
                    selector: 'kendo-treelist-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
        { type: OptionChangesService }
    ]; };
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
    return ColumnComponent;
}(ColumnBase));
export { ColumnComponent };
