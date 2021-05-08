/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { RowArgs } from './row-args';
/**
 * Represents the callback arguments that are used by the
 * [`rowClass`]({% slug api_grid_gridcomponent %}#toc-rowClass) property.
 */
export interface RowClassArgs extends RowArgs {
}
/**
 * Represents the callback that is used by the
 * [`rowClass`]({% slug api_grid_gridcomponent %}#toc-rowClass) property.
 *
 * ```ts-no-run
 *  rowCallback({ dataItem, index }) {
 *    const isEven = index % 2 == 0;
 *    return {
 *      even: isEven,
 *      odd: !isEven
 *    };
 *  }
 * ```
 *
 */
export declare type RowClassFn = (context: RowClassArgs) => string | string[] | Set<string> | {
    [key: string]: any;
};
/**
 * Represents the callback that is used by the
 * [`rowSelected`]({% slug api_grid_gridcomponent %}#toc-rowselected) property.
 *
 * ```ts-no-run
 * rowCallback({ dataItem, index }) {
 *   return index % 2 === 0;
 * }
 * ```
 */
export declare type RowSelectedFn = (context: RowArgs) => boolean;
