/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalEditService } from './local-edit.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
/**
 * @hidden
 */
export declare class HierarchyEditService extends LocalEditService {
    private bindingDirective;
    private localDataChanges?;
    constructor(bindingDirective: any, localDataChanges?: LocalDataChangesService);
    create(item: any, parent?: any, _id?: any): void;
    update(_item: any): void;
    remove(item: any, parent?: any): void;
    private notifyRemove;
}
