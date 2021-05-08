/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
const normalizeSettings = ({ buttonCount = 10, info = true, type = 'numeric', pageSizes = false, previousNext = true }) => ({
    buttonCount,
    info,
    pageSizes: pageSizes === true ? [5, 10, 20] : pageSizes,
    previousNext,
    type
});
const ɵ0 = normalizeSettings;
/**
 * @hidden
 */
export const normalize = (settings) => normalizeSettings(settings === true ? {} : settings);
export { ɵ0 };
