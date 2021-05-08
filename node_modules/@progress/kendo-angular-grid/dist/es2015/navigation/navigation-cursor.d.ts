/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
import { NavigationChange } from './navigation-change.interface';
import { NavigationCell } from './navigation-cell.interface';
import { NavigationModel } from './navigation-model';
import { NavigationMetadata } from './navigation-metadata';
/**
 * @hidden
 */
export declare class NavigationCursor {
    private model;
    readonly changes: Subject<NavigationChange>;
    metadata: NavigationMetadata;
    private activeRow;
    private activeCol;
    private virtualCol;
    private virtualRow;
    readonly row: any;
    readonly cell: NavigationCell;
    readonly dataRowIndex: number;
    constructor(model: NavigationModel);
    /**
     * Assumes and announces a new cursor position.
     */
    reset(rowIndex?: number, colIndex?: number, force?: boolean): void;
    activate(rowIndex: number, colIndex: number, force?: boolean): boolean;
    isActiveRange(rowIndex: number, colIndex: number): boolean;
    /**
     * Assumes a new cursor position without announcing it.
     */
    assume(rowIndex?: number, colIndex?: number): void;
    /**
     * Announces a current cursor position to subscribers.
     */
    announce(): void;
    activateVirtualCell(cell: any): boolean;
    isActive(rowIndex: number, colIndex: number): boolean;
    moveUp(offset?: number): boolean;
    moveDown(offset?: number): boolean;
    moveLeft(offset?: number): boolean;
    moveRight(offset?: number): boolean;
    lastCellIndex(row?: any): number;
    private offsetCol;
    private offsetRow;
}
