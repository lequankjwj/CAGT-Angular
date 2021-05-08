/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
export class ExpandStateService {
    constructor(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Set();
    }
    toggleRow(index, dataItem) {
        const found = this.rowState.has(index);
        const expand = !this.isInitiallyCollapsed ? found : !found;
        const prevented = this.emitEvent({ dataItem, expand, index });
        if (prevented) {
            return;
        }
        if (found) {
            this.rowState.delete(index);
        }
        else {
            this.rowState.add(index);
        }
    }
    isExpanded(index) {
        const found = this.rowState.has(index);
        return this.isInitiallyCollapsed ? found : !found;
    }
    reset() {
        this.rowState.clear();
    }
    emitEvent(args) {
        this.changes.next(args);
        return false;
    }
}
