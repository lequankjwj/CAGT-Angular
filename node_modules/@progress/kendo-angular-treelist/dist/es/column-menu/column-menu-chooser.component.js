/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
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
var ColumnMenuChooserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuChooserComponent, _super);
    function ColumnMenuChooserComponent(localization, columnInfoService, changeDetector) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.columnInfoService = columnInfoService;
        _this.changeDetector = changeDetector;
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
    Object.defineProperty(ColumnMenuChooserComponent.prototype, "columns", {
        get: function () {
            return this.columnInfoService.leafNamedColumns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuChooserComponent.prototype.onApply = function (changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    };
    ColumnMenuChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-columnmenu-chooser',
                    template: "\n        <kendo-treelist-columnmenu-item [text]=\"localization.get('columns')\"\n            icon=\"columns\" [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoTreeListColumnMenuItemContentTemplate>\n                <kendo-treelist-columnlist\n                    [applyText]=\"localization.get('columnsApply')\"\n                    [resetText]=\"localization.get('columnsReset')\"\n                    [columns]=\"columns\"\n                    [autoSync]=\"false\"\n                    [allowHideAll]=\"false\"\n                    [actionsClass]=\"actionsClass\"\n                    (apply)=\"onApply($event)\">\n                </kendo-treelist-columnlist>\n            </ng-template>\n        </kendo-treelist-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuChooserComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: ChangeDetectorRef }
    ]; };
    ColumnMenuChooserComponent.propDecorators = {
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        expanded: [{ type: Input }]
    };
    return ColumnMenuChooserComponent;
}(ColumnMenuItemBase));
export { ColumnMenuChooserComponent };
