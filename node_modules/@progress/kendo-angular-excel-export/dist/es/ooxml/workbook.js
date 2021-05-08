/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { IntlService, ExcelExporter, Workbook } from '@progress/kendo-ooxml';
import { toExporterColumns, destroyColumns } from './exporter-columns';
import { toString } from '@telerik/kendo-intl';
IntlService.register({ toString: toString });
/**
 *
 * @hidden
 */
export var workbookOptions = function (options) {
    var columns = toExporterColumns(options.columns);
    var exporter = new ExcelExporter({
        columns: columns,
        data: options.data,
        filterable: options.filterable,
        groups: options.group,
        paddingCellOptions: options.paddingCellOptions,
        headerPaddingCellOptions: options.headerPaddingCellOptions,
        collapsible: options.collapsible,
        hierarchy: options.hierarchy,
        aggregates: options.aggregates
    });
    var result = exporter.workbook();
    result.creator = options.creator;
    result.date = options.date;
    result.rtl = options.rtl;
    destroyColumns(columns);
    return result;
};
/**
 * @hidden
 */
export var toDataURL = function (options) {
    var workbook = new Workbook(options);
    return workbook.toDataURL();
};
/**
 * @hidden
 */
export var isWorkbookOptions = function (value) {
    return value && value.sheets;
};
