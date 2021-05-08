/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export declare const HEADER_CLASS: string;
/**
 * @hidden
 */
export declare const FOOTER_CLASS: string;
/**
 * @hidden
 */
export declare class GridQuery {
    private element;
    private headerWrap;
    private list;
    private footerWrap;
    constructor(element: HTMLElement);
    content(locked?: boolean): Element;
    header(locked?: boolean): Element;
    footer(locked?: boolean): Element;
    table(): Node;
}
