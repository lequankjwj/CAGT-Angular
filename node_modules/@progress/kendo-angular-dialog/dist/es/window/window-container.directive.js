/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ViewContainerRef } from '@angular/core';
import { WindowContainerService } from './window-container.service';
/**
 * Provides an insertion point for the Windows which are created through the
 * Window service ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 * Created Windows will be mounted after that element.
 *
 * @example
 * ```html-no-run
 * <div kendoWindowContainer></div>
 * ```
 */
var WindowContainerDirective = /** @class */ (function () {
    function WindowContainerDirective(container, service) {
        service.container = container;
    }
    WindowContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoWindowContainer]'
                },] },
    ];
    /** @nocollapse */
    WindowContainerDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: WindowContainerService }
    ]; };
    return WindowContainerDirective;
}());
export { WindowContainerDirective };
