/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { pdf } from '@progress/kendo-drawing';
/**
 * Specifies the margins of the page (numbers or strings with units).
 *
 * The supported units are:
 * * `"mm"`
 * * `"cm"`
 * * `"in"`
 * * `"pt"` (default)
 */
export interface PDFMargin extends pdf.PageMargin {
}
