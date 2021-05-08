/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var GridFocusableElement = /** @class */ (function () {
    function GridFocusableElement(navigationService) {
        this.navigationService = navigationService;
    }
    GridFocusableElement.prototype.focus = function () {
        this.navigationService.focusCell();
    };
    GridFocusableElement.prototype.toggle = function (active) {
        this.navigationService.toggle(active);
    };
    GridFocusableElement.prototype.canFocus = function () {
        return true;
    };
    GridFocusableElement.prototype.hasFocus = function () {
        return this.navigationService.hasFocus();
    };
    GridFocusableElement.prototype.isNavigable = function () {
        return false;
    };
    return GridFocusableElement;
}());
export { GridFocusableElement };
