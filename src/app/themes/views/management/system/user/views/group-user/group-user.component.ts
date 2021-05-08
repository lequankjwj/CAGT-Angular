import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IGroupUser } from '@core/models/users/users.model';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormGroupUserComponent } from '@themes/views/management/system/user/components/form-group-user/form-group-user.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { zoomInAnimation } from 'angular-animations';
import { BaseUserComponent } from '@themes/views/management/system/user/_base/base-user.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-group-user',
    templateUrl: './group-user.component.html',
    styleUrls: ['./group-user.component.scss'],
    animations: [zoomInAnimation()],
})
export class GroupUserComponent extends BaseUserComponent<IGroupUser> implements OnInit, OnDestroy {
    constructor(
        private apiService: ApiService,
        private utilService: UtilService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        private windowService: WindowService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    openForm() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Nhóm người dùng',
            content: FormGroupUserComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
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
                userIds: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const removeUser$ = this.apiService
                        .delete(UrlConstant.API.ACL_USER + '/UserGroups', body)
                        .pipe(takeUntil(this.destroyed$));
                    removeUser$.subscribe(() => {
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        this.gridState.skip = 0;
                        this.loadItems();
                        this.selectionIds = [];
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    /**
     * Loads data via api service
     */
    protected loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.ACL_USER + '/GetUserGroup', this.queryOptions, true).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items,
                        total: res.result.pagingInfo.totalItems,
                    };
                } else {
                    return {
                        data: [],
                        total: 0,
                    };
                }
            }),
            tap(res => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => {
                this.isLoading = false;
            })
        );
    }
}
