/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isDevMode } from '@angular/core';
/**
 * @hidden
 */
export class LocalEditService {
    create(_item, _parent, _id) {
        this.throwUnsupportedError();
    }
    update(_item) {
        // noop
    }
    remove(_item) {
        this.throwUnsupportedError();
    }
    assignValues(target, source) {
        Object.assign(target, source);
    }
    throwUnsupportedError() {
        if (isDevMode()) {
            throw new Error('The default edit service of the editing directives can only update the items.' +
                'Please provide an editService.');
        }
    }
}
