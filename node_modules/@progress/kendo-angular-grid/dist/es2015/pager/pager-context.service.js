/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
export class PagerContextService {
    constructor() {
        this.changes = new Subject();
        this.pageChange = new Subject();
    }
    get currentPage() {
        return this.skip / this.pageSize;
    }
    notifyChanges(changes) {
        this.total = changes.total;
        this.pageSize = changes.pageSize;
        this.skip = changes.skip;
        this.changes.next(changes);
    }
    changePage(page) {
        this.pageChange.next({ skip: page * this.pageSize, take: this.pageSize });
    }
    changePageSize(value) {
        this.pageChange.next({ skip: 0, take: value });
    }
    nextPage() {
        const nextPage = this.currentPage + 1;
        if (nextPage * this.pageSize < this.total) {
            this.changePage(nextPage);
        }
    }
    prevPage() {
        const prevPage = this.currentPage - 1;
        if (prevPage * this.pageSize >= 0) {
            this.changePage(prevPage);
        }
    }
}
