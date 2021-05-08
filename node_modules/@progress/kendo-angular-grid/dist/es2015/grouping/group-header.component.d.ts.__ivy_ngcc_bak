/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DoCheck } from '@angular/core';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { GroupInfoService } from './group-info.service';
import { GroupsService } from './groups.service';
import { GroupItem } from '../data/group-item.interface';
/**
 * @hidden
 */
export declare class GroupHeaderComponent implements DoCheck {
    groupsService: GroupsService;
    groupInfoService: GroupInfoService;
    rowIndex: number;
    logicalRowIndex: number;
    item: GroupItem;
    skipGroupDecoration: boolean;
    hasDetails: boolean;
    totalColumnsCount: number;
    hasGroupHeaderColumn: boolean;
    groupHeaderColumns: any[];
    columns: any;
    groups: Array<GroupDescriptor>;
    isExpanded: boolean;
    readonly groupItemClass: boolean;
    constructor(groupsService: GroupsService, groupInfoService: GroupInfoService);
    ngDoCheck(): void;
    prefixGroupCell(item: GroupItem): any[];
    toggleGroup(item: GroupItem): boolean;
    groupSpan(item: GroupItem): number;
    logicalColSpan(): number;
    ariaRole(): string;
    formatForGroup(item: GroupItem): string;
    groupTitle(item: GroupItem): string;
    groupHeaderTemplate(item: GroupItem): any;
}
