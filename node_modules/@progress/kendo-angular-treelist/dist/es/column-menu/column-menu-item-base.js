/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, isDevMode, HostBinding } from '@angular/core';
import { ColumnMenuService } from './column-menu.service';
/**
 * @hidden
 */
var ColumnMenuItemBase = /** @class */ (function () {
    function ColumnMenuItemBase() {
        this.hostClass = true;
    }
    ColumnMenuItemBase.prototype.ngOnInit = function () {
        if (isDevMode() && !this.service) {
            throw new Error('The service input of the predefined column menu components is mandatory.');
        }
    };
    /**
     * @hidden
     */
    ColumnMenuItemBase.prototype.close = function () {
        this.service.close();
    };
    ColumnMenuItemBase.propDecorators = {
        service: [{ type: Input }],
        hostClass: [{ type: HostBinding, args: ['class.k-columnmenu-item-wrapper',] }]
    };
    return ColumnMenuItemBase;
}());
export { ColumnMenuItemBase };
