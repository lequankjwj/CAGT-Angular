/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { FilterHostDirective } from "../filter-host.directive";
import { isNullOrEmptyString } from "../../utils";
import { filterComponentFactory } from "./filter-cell-component.factory";
import { StringFilterCellComponent } from "./string-filter-cell.component";
/**
 * @hidden
 */
var FilterCellHostDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FilterCellHostDirective, _super);
    function FilterCellHostDirective(host, resolver) {
        return _super.call(this, host, resolver) || this;
    }
    FilterCellHostDirective.prototype.componentType = function () {
        if (!isNullOrEmptyString(this.column.filter)) {
            return filterComponentFactory(this.column.filter);
        }
        return StringFilterCellComponent;
    };
    FilterCellHostDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFilterCellHost]'
                },] },
    ];
    /** @nocollapse */
    FilterCellHostDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver }
    ]; };
    return FilterCellHostDirective;
}(FilterHostDirective));
export { FilterCellHostDirective };
