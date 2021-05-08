/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var ColumnMenuFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuFilterComponent, _super);
    function ColumnMenuFilterComponent(localization) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        /**
         * Fires when the content is expanded.
         */
        _this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        _this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        _this.expanded = false;
        /**
         * @hidden
         */
        _this.actionsClass = 'k-columnmenu-actions';
        return _this;
    }
    ColumnMenuFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-columnmenu-filter',
                    template: "\n        <kendo-treelist-columnmenu-item [text]=\"localization.get('filter')\" icon=\"filter\"\n            [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoTreeListColumnMenuItemContentTemplate>\n                    <kendo-treelist-filter-menu-container\n                        [column]=\"service.column\"\n                        [filter]=\"service.filter\"\n                        [actionsClass]=\"actionsClass\"\n                        (close)=\"close()\">\n                    </kendo-treelist-filter-menu-container>\n                </ng-template>\n        </kendo-treelist-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuFilterComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    ColumnMenuFilterComponent.propDecorators = {
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        expanded: [{ type: Input }]
    };
    return ColumnMenuFilterComponent;
}(ColumnMenuItemBase));
export { ColumnMenuFilterComponent };
