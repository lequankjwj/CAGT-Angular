/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export class GridFocusableElement {
    constructor(navigationService) {
        this.navigationService = navigationService;
    }
    focus() {
        this.navigationService.focusCell();
    }
    toggle(active) {
        this.navigationService.toggle(active);
    }
    canFocus() {
        return true;
    }
    hasFocus() {
        return this.navigationService.hasFocus();
    }
    isNavigable() {
        return false;
    }
}
