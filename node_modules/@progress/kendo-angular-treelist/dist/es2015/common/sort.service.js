/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * @hidden
 */
export class SortService {
    constructor() {
        this.changes = new Subject();
    }
    sort(value) {
        this.changes.next(value);
    }
}
