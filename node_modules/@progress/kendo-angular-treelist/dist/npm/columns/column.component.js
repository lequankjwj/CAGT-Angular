/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var cell_template_directive_1 = require("../rendering/cell-template.directive");
var edit_template_directive_1 = require("../editing/edit-template.directive");
var column_base_1 = require("./column-base");
var utils_1 = require("../utils");
var filter_cell_template_directive_1 = require("../filtering/cell/filter-cell-template.directive");
var filter_menu_template_directive_1 = require("../filtering/menu/filter-menu-template.directive");
var option_changes_service_1 = require("../common/option-changes.service");
/**
 * @hidden
 */
function isColumnComponent(column) {
    return utils_1.isPresent(column.field);
}
exports.isColumnComponent = isColumnComponent;
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
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: column_base_1.ColumnBase,
                            useExisting: core_1.forwardRef(function () { return ColumnComponent; })
                        }
                    ],
                    selector: 'kendo-treelist-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional }] },
        { type: option_changes_service_1.OptionChangesService }
    ]; };
    ColumnComponent.propDecorators = {
        expandable: [{ type: core_1.Input }],
        field: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        sortable: [{ type: core_1.Input }],
        editor: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        editable: [{ type: core_1.Input }],
        template: [{ type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective,] }],
        editTemplate: [{ type: core_1.ContentChild, args: [edit_template_directive_1.EditTemplateDirective,] }],
        filterCellTemplate: [{ type: core_1.ContentChild, args: [filter_cell_template_directive_1.FilterCellTemplateDirective,] }],
        filterMenuTemplate: [{ type: core_1.ContentChild, args: [filter_menu_template_directive_1.FilterMenuTemplateDirective,] }]
    };
    return ColumnComponent;
}(column_base_1.ColumnBase));
exports.ColumnComponent = ColumnComponent;
