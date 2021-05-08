/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { LocalEditService } from './local-edit.service';
/**
 * @hidden
 */
export class LocalRowEditService extends LocalEditService {
    update(_item) {
        this.dataChanged();
    }
}
