/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:pipe-naming */
import { Pipe } from '@angular/core';
/**
 * @hidden
 */
export class LevelItemsPipe {
    transform(level, hasChildren) {
        const result = [];
        const count = level + 1 - (hasChildren ? 1 : 0);
        for (let idx = 0; idx < count; idx++) {
            result.push(idx);
        }
        return result;
    }
}
LevelItemsPipe.decorators = [
    { type: Pipe, args: [{
                name: 'levelItems',
                pure: true
            },] },
];
