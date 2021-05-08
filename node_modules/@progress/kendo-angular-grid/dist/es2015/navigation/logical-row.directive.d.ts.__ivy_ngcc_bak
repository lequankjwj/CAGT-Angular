/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, OnChanges } from '@angular/core';
import { IdService } from '../common/id.service';
import { NavigationService } from './navigation.service';
import { LogicalRow } from './logical-row.interface';
/**
 * @hidden
 */
export declare class LogicalRowDirective implements LogicalRow, OnDestroy, OnChanges {
    private idService;
    private navigation;
    logicalRowIndex: number;
    logicalSlaveRow: boolean;
    logicalCellsCount: number;
    logicalSlaveCellsCount: number;
    dataRowIndex: number;
    dataItem: any;
    uid: number;
    readonly hostRole: string;
    readonly ariaRowIndex: number;
    readonly ariaOwns: string;
    constructor(idService: IdService, navigation: NavigationService);
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
