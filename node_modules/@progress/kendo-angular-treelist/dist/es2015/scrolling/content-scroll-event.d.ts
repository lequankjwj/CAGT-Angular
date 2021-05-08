/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Arguments for the `contentScroll` event.
 */
export interface ContentScrollEvent {
    /**
     * The scroll left position.
     */
    scrollLeft: number;
    /**
     * The scroll top position.
     */
    scrollTop: number;
    /**
     * The index of the first row visible in the viewport.
     * Available only if the treelist is configured for virtual scrolling.
     *
     * @hidden
     */
    startRow: number;
    /**
     * The index of the last row visible in the viewport.
     * Available only if the treelist is configured for virtual scrolling.
     *
     * @hidden
     */
    endRow: number;
    /**
     * The index of the first column visible in the viewport.
     * Available only if the `virtualColumns` option is set to true.
     */
    startColumn: number;
    /**
     * The index of the last column visible in the viewport.
     * Available only if the `virtualColumns` option is set to true.
     */
    endColumn: number;
}
