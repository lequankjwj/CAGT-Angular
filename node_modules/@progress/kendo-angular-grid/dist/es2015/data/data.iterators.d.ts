/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GroupResult } from '@progress/kendo-data-query';
import { DataItem } from './data-item.interface';
import { GridItem } from './grid-item.interface';
import { GroupFooterItem } from './group-footer-item.interface';
import { GroupItem } from './group-item.interface';
/**
 * @hidden
 */
export declare const itemAt: (data: any[], index: number) => any;
/**
 * @hidden
 */
export interface IteratorResult<T> {
    done: boolean;
    value: T;
}
/**
 * @hidden
 */
export declare type IteratorState = {
    footers?: boolean;
    level?: number;
    dataIndex?: number;
    parentGroupIndex?: string;
    groupIndex?: number;
};
/**
 * @hidden
 */
export declare const getIterator: (data: any[], { footers, level, dataIndex, parentGroupIndex, groupIndex }: IteratorState) => any;
/**
 * @hidden
 */
export declare class Iterator<T> {
    protected dataIndex: number;
    private resultMap;
    protected _innerIterator: any;
    constructor(arr: any[], dataIndex?: number, resultMap?: <T>(x: T, idx: number) => T);
    next(): IteratorResult<T>;
}
/**
 * @hidden
 */
export declare class ItemIterator extends Iterator<DataItem> {
    constructor(arr: any[], dataIndex: number, groupIndex: string);
    /**
     * The index of the next record.
     * @readonly
     * @type {number}
     */
    readonly index: number;
}
/**
 * @hidden
 */
export declare class GroupIterator<T> {
    private arr;
    private outputFooters;
    private level;
    private dataIndex;
    private parentIndex;
    private groupIndex;
    private current;
    private _innerIterator;
    private _iterator;
    private currentGroupIndex;
    constructor(arr: Array<GroupResult>, outputFooters?: boolean, level?: number, dataIndex?: number, parentIndex?: string, groupIndex?: number);
    protected nextGroupItem(): IteratorResult<GroupItem>;
    protected footerItem(): IteratorResult<GroupFooterItem>;
    protected innerIterator(group: GroupResult): GroupIterator<T> | ItemIterator;
    protected nextDataItem(group: GroupResult): IteratorResult<GridItem>;
    next(): IteratorResult<GridItem>;
    /**
     * The index of the last iterated data record.
     * @readonly
     * @type {number}
     */
    readonly index: number;
}
