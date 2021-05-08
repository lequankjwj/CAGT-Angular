/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditService } from './edit-service.interface';
/**
 * @hidden
 */
export declare class LocalEditService implements EditService {
    create(_item: any, _parent?: any, _id?: any): void;
    update(_item: any): void;
    remove(_item: any): void;
    assignValues(target: any, source: any): void;
    protected throwUnsupportedError(): void;
}
