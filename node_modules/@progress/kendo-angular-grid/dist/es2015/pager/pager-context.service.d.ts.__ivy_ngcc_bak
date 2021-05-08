/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
import { PageChangeEvent } from "../data/change-event-args.interface";
/**
 * @hidden
 */
export declare type PagerContextChanges = {
    total: number;
    skip: number;
    pageSize: number;
};
/**
 * @hidden
 */
export declare class PagerContextService {
    total: number;
    skip: number;
    pageSize: number;
    changes: Subject<PagerContextChanges>;
    pageChange: Subject<PageChangeEvent>;
    private readonly currentPage;
    notifyChanges(changes: PagerContextChanges): void;
    changePage(page: number): void;
    changePageSize(value: number): void;
    nextPage(): void;
    prevPage(): void;
}
