/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { FilterService } from "../filter.service";
import { ColumnComponent } from '../../columns/column.component';
import { SinglePopupService } from '../../common/single-popup.service';
import { filtersByField } from '../base-filter-cell.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
/**
 * @hidden
 */
var FilterMenuComponent = /** @class */ (function () {
    function FilterMenuComponent(filterService, popupService, localization) {
        this.filterService = filterService;
        this.popupService = popupService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.filterLabel = this.localization.get('filter');
    }
    Object.defineProperty(FilterMenuComponent.prototype, "hasFilters", {
        get: function () {
            return filtersByField(this.filter, (this.column || {}).field).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuComponent.prototype.toggle = function (anchor, template) {
        this.popupRef = this.popupService.open(anchor, template, this.popupRef);
        return false;
    };
    FilterMenuComponent.prototype.close = function () {
        this.popupService.destroy();
    };
    FilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-filter-menu',
                    template: "\n        <a #anchor\n            [ngClass]=\"{'k-grid-filter':true, 'k-state-active': hasFilters}\"\n            (click)=\"toggle(anchor, template)\"\n            href=\"#\"\n            [attr.title]=\"filterLabel\">\n            <span class=\"k-icon k-i-filter\"></span>\n        </a>\n        <ng-template #template>\n            <kendo-treelist-filter-menu-container\n                [column]=\"column\"\n                [filter]=\"filter\"\n                (close)=\"close()\"\n                >\n            </kendo-treelist-filter-menu-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: SinglePopupService },
        { type: LocalizationService }
    ]; };
    FilterMenuComponent.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }]
    };
    return FilterMenuComponent;
}());
export { FilterMenuComponent };
