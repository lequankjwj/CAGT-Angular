/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { FilterHostDirective } from "../filter-host.directive";
import { isNullOrEmptyString } from "../../utils";
import { filterComponentFactory } from "./filter-cell-component.factory";
import { StringFilterCellComponent } from "./string-filter-cell.component";
/**
 * @hidden
 */
export class FilterCellHostDirective extends FilterHostDirective {
    constructor(host, resolver) {
        super(host, resolver);
    }
    componentType() {
        if (!isNullOrEmptyString(this.column.filter)) {
            return filterComponentFactory(this.column.filter);
        }
        return StringFilterCellComponent;
    }
}
FilterCellHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoFilterCellHost]'
            },] },
];
/** @nocollapse */
FilterCellHostDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
