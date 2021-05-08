/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalEditService } from './local-edit.service';
import { hasObservers } from '@progress/kendo-angular-common';
import { insertNewItem } from './utils';
/**
 * @hidden
 */
export class HierarchyEditService extends LocalEditService {
    constructor(bindingDirective, localDataChanges) {
        super();
        this.bindingDirective = bindingDirective;
        this.localDataChanges = localDataChanges;
    }
    create(item, parent, _id) {
        const { childrenGetter, childrenSetter, originalData, treelist } = this.bindingDirective;
        if (parent) {
            const children = childrenGetter(parent);
            if (children) {
                children.unshift(item);
            }
            else {
                childrenSetter(parent, [item]);
            }
        }
        else {
            insertNewItem(item, originalData, treelist);
        }
        this.bindingDirective.rebind();
    }
    update(_item) {
        this.bindingDirective.rebind();
    }
    remove(item, parent) {
        const idGetter = this.bindingDirective.treelist.idGetter; // refactor provide idGetter via context service
        const { childrenGetter, originalData } = this.bindingDirective;
        const children = parent ? childrenGetter(parent) : originalData;
        if (children && children.length) {
            const id = idGetter(item);
            const index = children.findIndex(i => idGetter(i) === id);
            if (index >= 0) {
                children.splice(index, 1);
                this.bindingDirective.rebind();
                this.notifyRemove(item);
            }
        }
    }
    notifyRemove(item) {
        if (this.localDataChanges && hasObservers(this.localDataChanges.changes)) {
            const childrenGetter = this.bindingDirective.childrenGetter;
            const toNotify = [item];
            while (toNotify.length) {
                const current = toNotify.shift();
                this.localDataChanges.changes.emit({ action: 'remove', item: current });
                const children = childrenGetter(current);
                if (children && children.length) {
                    toNotify.push.apply(toNotify, children);
                }
            }
        }
    }
}
