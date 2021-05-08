/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
/**
 * @hidden
 */
export declare class NavigationMetadata {
    dataRows: number;
    headerRows: number;
    isVirtual: boolean;
    hasPager: boolean;
    hasDetailTemplate: boolean;
    gridElement: ElementRef;
    virtualColumns: boolean;
    columns: any;
    readonly maxLogicalRowIndex: number;
    constructor(dataRows: number, headerRows: number, isVirtual: boolean, hasPager: boolean, hasDetailTemplate: boolean, gridElement: ElementRef, virtualColumns: boolean, columns: any);
}
