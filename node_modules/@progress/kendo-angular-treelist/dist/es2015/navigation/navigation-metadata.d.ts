/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
/**
 * @hidden
 */
export declare class NavigationMetadata {
    view: any;
    headerRows: number;
    isVirtual: boolean;
    hasPager: boolean;
    treelistElement: ElementRef;
    virtualColumns: boolean;
    columns: any;
    readonly maxLogicalRowIndex: number;
    readonly dataRows: number;
    constructor(view: any, headerRows: number, isVirtual: boolean, hasPager: boolean, treelistElement: ElementRef, virtualColumns: boolean, columns: any);
}
