/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
/**
 * Arguments for the `excelExport` event.
 */
export class ExcelExportEvent extends PreventableEvent {
    constructor(workbook) {
        super();
        this.workbook = workbook;
    }
}
