import { OnInit } from '@angular/core';
import { MenuQuery } from '@management-state/menu/menu.query';
import { ActionType } from '@core/constants/enum.constant';
import { ListRoleOption } from '@core/auth/user-role-option';

export abstract class BaseCheckPermission implements OnInit {
    roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };

    roleOfOption = ListRoleOption;

    constructor(protected menuQuery: MenuQuery) {}

    ngOnInit(): void {
        const storage = this.menuQuery.getStorage();
        if (storage && storage.length > 0) {
            const permissions = this.menuQuery.getPermissionWithCurrentUrl(storage);
            if (permissions.includes(ActionType.VIEW)) {
                this.roles.isView = true;
            }

            if (permissions.includes(ActionType.CREATE)) {
                this.roles.isCreate = true;
            }

            if (permissions.includes(ActionType.DELETE)) {
                this.roles.isDelete = true;
            }

            if (permissions.includes(ActionType.UPDATE)) {
                this.roles.isUpdate = true;
            }
        }
    }

    checkHasPermissionOfListOption(key) {
        return !!ListRoleOption[key];
    }
}
