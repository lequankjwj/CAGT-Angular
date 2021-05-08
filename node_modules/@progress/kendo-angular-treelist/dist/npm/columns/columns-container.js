/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_group_component_1 = require("./column-group.component");
var column_common_1 = require("./column-common");
var reset = function () {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var diff = false;
    for (var idx = 0; idx < lists.length; idx++) {
        var _a = lists[idx], list = _a[0], columns = _a[1];
        diff = diff || list.length !== columns.length;
        list.reset(columns);
    }
    return diff;
};
var ɵ0 = reset;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var ColumnsContainer = /** @class */ (function () {
    function ColumnsContainer(columns) {
        this.columns = columns;
        this.allColumns = new core_1.QueryList();
        this.leafColumns = new core_1.QueryList();
        this.lockedColumns = new core_1.QueryList();
        this.nonLockedColumns = new core_1.QueryList();
        this.lockedLeafColumns = new core_1.QueryList();
        this.nonLockedLeafColumns = new core_1.QueryList();
        this.totalLevels = 0;
        this.changes = new core_1.EventEmitter();
        this.leafColumnsToRender = [];
        this.lockedColumnsToRender = [];
        this.nonLockedColumnsToRender = [];
        this.hasFooter = false;
        this.unlockedWidth = 0;
    }
    ColumnsContainer.prototype.refresh = function () {
        var _this = this;
        var currentLevels = this.totalLevels;
        var leafColumns = new Array();
        var lockedLeafColumns = new Array();
        var nonLockedLeafColumns = new Array();
        var lockedColumns = new Array();
        var nonLockedColumns = new Array();
        var allColumns = new Array();
        var leafColumnsToRender = new Array();
        var lockedColumnsToRender = new Array();
        var nonLockedColumnsToRender = new Array();
        var hasFooter = false;
        var unlockedWidth = 0;
        var leafIndex = 0;
        this.totalLevels = 0;
        this.columns().forEach(function (column) {
            var containerLeafColumns = column.isLocked === true ? lockedLeafColumns : nonLockedLeafColumns;
            var containerColumns = column.isLocked === true ? lockedColumns : nonLockedColumns;
            var toRenderContainer = column.isLocked === true ? lockedColumnsToRender : nonLockedColumnsToRender;
            if (!column_group_component_1.isColumnGroupComponent(column)) {
                containerLeafColumns.push(column);
                leafColumns.push(column);
                leafColumnsToRender.push.apply(leafColumnsToRender, column_common_1.columnsToRender([column]));
                toRenderContainer.push.apply(toRenderContainer, column_common_1.columnsToRender([column]));
                hasFooter = hasFooter || column_common_1.someLeafColumn(function (leaf) { return Boolean(leaf.footerTemplateRef); }, column);
                if (!column.isLocked) {
                    unlockedWidth += column.width || 0;
                }
                if (column.isSpanColumn) {
                    column.childColumns.forEach(function (c) {
                        c.leafIndex = leafIndex++;
                    });
                }
                else {
                    column.leafIndex = leafIndex++;
                }
            }
            containerColumns.push(column);
            allColumns.push(column);
            _this.totalLevels = column.level > _this.totalLevels ? column.level : _this.totalLevels;
        });
        this.hasFooter = hasFooter;
        this.leafColumnsToRender = leafColumnsToRender;
        this.lockedColumnsToRender = lockedColumnsToRender;
        this.nonLockedColumnsToRender = nonLockedColumnsToRender;
        this.unlockedWidth = unlockedWidth;
        var changes = reset([this.leafColumns, leafColumns], [this.lockedLeafColumns, lockedLeafColumns], [this.nonLockedLeafColumns, nonLockedLeafColumns], [this.lockedColumns, lockedColumns], [this.allColumns, allColumns], [this.nonLockedColumns, nonLockedColumns]) || currentLevels !== this.totalLevels;
        if (changes) {
            this.changes.emit();
        }
        return changes;
    };
    return ColumnsContainer;
}());
exports.ColumnsContainer = ColumnsContainer;
