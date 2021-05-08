/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var TreeListFocusableElement = /** @class */ (function () {
    function TreeListFocusableElement(navigationService) {
        this.navigationService = navigationService;
    }
    TreeListFocusableElement.prototype.focus = function () {
        this.navigationService.focusCell();
    };
    TreeListFocusableElement.prototype.toggle = function (active) {
        this.navigationService.toggle(active);
    };
    TreeListFocusableElement.prototype.canFocus = function () {
        return true;
    };
    TreeListFocusableElement.prototype.hasFocus = function () {
        return this.navigationService.hasFocus();
    };
    TreeListFocusableElement.prototype.isNavigable = function () {
        return false;
    };
    return TreeListFocusableElement;
}());
export { TreeListFocusableElement };
