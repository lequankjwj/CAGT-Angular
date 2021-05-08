import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { FormBuilder, FormControl } from '@angular/forms';
import { PermissionService } from '@core/services/business/permission.service';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { UrlConstant } from '@core/constants/url.constant';
import { IPagedResult } from '@core/models/common/response-data.model';
import { IUser } from '@core/models/users/users.model';
import { AddUserToGroupComponent } from '@themes/views/management/system/user/components/add-user-to-group/add-user-to-group.component';
import { MessageConstant } from '@core/constants/message.constant';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-list-user-create-group',
    templateUrl: './list-user-create-group.component.html',
    styleUrls: ['./list-user-create-group.component.scss'],
})
export class ListUserCreateGroupComponent implements OnInit, OnDestroy {
    @Input() idGroupPermission: number;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    selectionIds: number[] = [];
    opened = false;
    pageConfig: PagerSettings | boolean = PageConfig;
    loading = false;

    groupPermissionControl = new FormControl();
    private destroyed$ = new Subject();
    constructor(
        private permissionService: PermissionService,
        private modal: NzModalService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private windowService: WindowService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        if (this.idGroupPermission) {
            this.groupPermissionControl.setValue(this.idGroupPermission);
        }
        this.loadUserInGroupPermission();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadUserInGroupPermission();
    }

    closeForm(isLoad) {
        this.windowRef.close(isLoad);
    }

    showFormAddToCreateGroup() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Thêm người dùng vào nhóm quyền ',
            content: AddUserToGroupComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.idGroupPermission = this.idGroupPermission;

        windowRef.result.subscribe(result => {
            if (result === true) {
                this.loadUserInGroupPermission();
            }
            this.opened = false;
        });
    }

    /**
     * Removes handler
     * @param dataItem
     */
    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                idGroupPermission: this.idGroupPermission,
                idUsers: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.permissionService
                        .removeUserToPermissionCreateGroup(body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            this.gridState.skip = 0;
                            this.loadUserInGroupPermission();
                            this.selectionIds = [];
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    private loadUserInGroupPermission() {
        this.loading = true;
        this.gridView$ = this.permissionService.getUserFromPermissionCreateGroup(this.queryOptions).pipe(
            map(
                res => {
                    const results = res as IPagedResult<IUser[]>;
                    if (res) {
                        return {
                            data: results.items,
                            total: results.pagingInfo.totalItems,
                        };
                    } else {
                        return {
                            data: [],
                            total: 0,
                        };
                    }
                },
                finalize(() => (this.loading = false))
            )
        );
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            idGroupPermission: this.idGroupPermission,
        };
    }
}
