/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * The interface of the `editService` that can be set to the
 * [editing directives]({% slug editing_directives_treelist %}#toc-custom-service) of the TreeList.
 */
export interface EditService {
    /**
     * The method that is called to create a new item.
     */
    create(item: any, parent?: any, id?: any): void;
    /**
     * The method that is called to update the items for existing item.
     */
    update(item: any): void;
    /**
     * The method that is called to remove existing item.
     */
    remove(item: any, parent?: any): void;
    /**
     * The method that is called to set new values to an item.
     */
    assignValues(target: any, source: any): void;
}
