import { Injectable } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult } from '@core/models/common/response-data.model';
import {
    IGridGroupPermission,
    IGridPermission,
    IPermisisonOfUser,
    ITreeGroupPermission,
    ITreeUser,
} from '@core/models/permissions/permission.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PermissionService {
    constructor(private apiService: ApiService) {}

    savePermission(model) {
        return this.apiService
            .post(UrlConstant.API.ACL_PERMISSION_GROUP_ACTION + '/ChangingPermissionGroupAction', model)
            .pipe(map(res => res.result));
    }
    /**
     * Gets user tree for select
     * @param model
     * @returns user tree for select
     */
    getUserFromGroupPermisisonForSelect(model): Observable<IPagedResult<any[]>> {
        return this.apiService
            .post(UrlConstant.API.ACL_PERMISSION_GROUP_USER + '/GetUsersFromPermissionGroup', model)
            .pipe(map(res => res.result));
    }

    /**
     * Gets group for tree
     * @param currentLevel
     * @param idGroupPermission
     * @returns group for tree
     */
    getGroupForTree(currentLevel: number, idGroupPermission: number): Observable<ITreeGroupPermission[]> {
        return this.apiService
            .post(UrlConstant.API.ACL_PERMISSION_GROUP + '/PermissionGroupTree', {
                currentLevel: currentLevel,
                idGroupPermission: idGroupPermission,
            })
            .pipe(map(res => res.result));
    }

    /**
     * Creates group permission
     * @param model
     * @returns
     */
    createGroupPermission(model) {
        return this.apiService.post(UrlConstant.API.ACL_PERMISSION_GROUP, model);
    }

    /**
     * Updates group permission
     * @param model
     * @returns
     */
    updateGroupPermission(model) {
        return this.apiService.put(UrlConstant.API.ACL_PERMISSION_GROUP, model);
    }

    /**
     * Removes group permission
     * @param model
     * @returns
     */
    removeGroupPermission(model) {
        return this.apiService.delete(UrlConstant.API.ACL_PERMISSION_GROUP, model);
    }

    /**
     * Adds user to group permission
     * @param model
     * @returns
     */
    addUserToGroupPermission(model) {
        return this.apiService.post(UrlConstant.API.ACL_PERMISSION_GROUP_USER + '/AddUsersToPermissionGroup', model);
    }

    /**
     * Removes user from group permission
     * @param model
     * @returns
     */
    removeUserFromGroupPermission(model) {
        return this.apiService.delete(UrlConstant.API.ACL_PERMISSION_GROUP_USER + '/RemoveUsersToPermissionGroup', model);
    }

    /**
     * Gets action by group
     * @param model
     * @returns action by group
     */
    getActionByGroup(model): Observable<IGridGroupPermission[]> {
        return this.apiService
            .post(UrlConstant.API.ACL_PERMISSION_GROUP_ACTION + '/GetPermissionGroupActions', model)
            .pipe(map(res => res.result));
    }

    /**
     * Gets list action by group select
     * @param model
     * @returns list action by group select
     */
    getListActionByGroupSelect(model): Observable<IPermisisonOfUser> {
        return this.apiService
            .post(UrlConstant.API.ACL_PERMISSION_GROUP_ACTION + '/GetArrCkbPermissionActionGroup', model)
            .pipe(map(res => res.result));
    }

    addUserToCreationGroup(model) {
        return this.apiService
            .post(UrlConstant.API.ACL_GROUP_CREATION_PERMISSION + '/AddUsersToGroupCreationPermission', model)
            .pipe(map(res => res.result));
    }

    removeUserToPermissionCreateGroup(model) {
        return this.apiService
            .delete(UrlConstant.API.ACL_GROUP_CREATION_PERMISSION + '/DeleteUsersFromGroupCreationPermission', model)
            .pipe(map(res => res.result));
    }

    getUserFromPermissionCreateGroup(model) {
        return this.apiService
            .post(UrlConstant.API.ACL_GROUP_CREATION_PERMISSION + '/GetUsersInGroupCreationPermission', model)
            .pipe(map(res => res.result));
    }

    private convertToTree() {}
}
