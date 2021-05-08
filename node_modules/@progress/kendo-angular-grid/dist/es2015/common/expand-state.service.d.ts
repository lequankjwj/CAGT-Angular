/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
export declare abstract class ExpandStateService {
    protected isInitiallyCollapsed: boolean;
    changes: Subject<{
        dataItem: any;
        expand: boolean;
        index: number;
    }>;
    protected rowState: Set<any>;
    constructor(isInitiallyCollapsed: boolean);
    toggleRow(index: any, dataItem: any): void;
    isExpanded(index: any): boolean;
    reset(): void;
    protected emitEvent(args: any): boolean;
}
