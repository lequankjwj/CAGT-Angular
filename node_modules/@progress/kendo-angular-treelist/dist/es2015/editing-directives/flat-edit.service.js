/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalEditService } from './local-edit.service';
import { guid } from '@progress/kendo-angular-common';
import { isPresent } from '../utils';
import { insertNewItem } from './utils';
/**
 * @hidden
 */
export class FlatEditService extends LocalEditService {
    constructor(bindingDirective, localDataChanges) {
        super();
        this.bindingDirective = bindingDirective;
        this.localDataChanges = localDataChanges;
    }
    create(item, parent, id) {
        const { idGetter, idSetter, parentIdSetter, originalData, treelist } = this.bindingDirective;
        idSetter(item, isPresent(id) ? id : guid());
        if (parent) {
            parentIdSetter(item, idGetter(parent));
        }
        insertNewItem(item, originalData, treelist, parent);
        this.bindingDirective.rebind();
    }
    update(_item) {
        this.bindingDirective.rebind();
    }
    remove(item, _parent) {
        const { idGetter, parentIdGetter, originalData } = this.bindingDirective;
        const toRemove = [item];
        while (toRemove.length) {
            const current = toRemove.shift();
            const id = idGetter(current);
            let itemIndex = -1;
            for (let idx = 0; idx < originalData.length; idx++) {
                const dataItem = originalData[idx];
                if (itemIndex === -1 && idGetter(dataItem) === id) {
                    itemIndex = idx;
                }
                if (parentIdGetter(dataItem) === id) {
                    toRemove.push(dataItem);
                }
            }
            if (itemIndex >= 0) {
                originalData.splice(itemIndex, 1);
                this.notifyRemove(current);
            }
        }
        this.bindingDirective.rebind();
    }
    notifyRemove(item) {
        if (this.localDataChanges) {
            this.localDataChanges.changes.emit({ action: 'remove', item });
        }
    }
}
