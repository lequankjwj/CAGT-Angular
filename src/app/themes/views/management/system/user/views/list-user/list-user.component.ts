import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { expandCollapse } from '@core/animations/expand-collapse.animations';
import { ModalDeleteConfig, PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IUser } from '@core/models/users/users.model';
import { NotificationService } from '@core/services/common/notification.service';
import { GridDataResult, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormUserComponent } from '@themes/views/management/system/user/components/form-user/form-user.component';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { UpdatePasswordComponent } from '@themes/views/management/system/user/components/update-password/update-password.component';
import { BaseUserComponent } from '@themes/views/management/system/user/_base/base-user.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
    animations: [expandCollapse],
})
export class ListUserComponent extends BaseUserComponent<IUser> implements OnInit, OnDestroy {
    gridView: GridDataResult;

    userSelecteds = [];
    selectAllState: SelectAllCheckboxState = 'unchecked';

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        private windowService: WindowService,
        private viewContainerRef: ViewContainerRef,
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
            title: 'Người dùng',
            content: FormUserComponent,
            width: 850,
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
                    this.apiService
                        .delete(UrlConstant.API.ACL_USER, body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            // show notification
                            this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            // set current page
                            this.gridState.skip = 0;
                            // reload data
                            this.loadItems();

                            // reset
                            this.selectionIds = [];
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    updatePasswordForOneUser(dataItem) {
        this.userSelecteds = [];
        this.userSelecteds.push({
            id: dataItem.id,
            userName: dataItem.userName,
        });
        this.createModalChangePassword();
    }

    createModalChangePassword() {
        if (this.userSelecteds.length > 0) {
            this.modal.create({
                nzTitle: 'Thay đổi mật khẩu',
                nzContent: UpdatePasswordComponent,
                nzViewContainerRef: this.viewContainerRef,
                nzComponentParams: {
                    listUserName: this.userSelecteds.map(m => m.userName),
                },
                nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
                nzFooter: null,
            });
        } else {
            this.notificationService.showWarningMessage('Chưa chọn nhân sự !');
        }
    }

    onSelectAllChange(checkedState: SelectAllCheckboxState) {
        const ids = this.gridView.data.map(m => m.id);
        if (checkedState === 'checked') {
            const nhanSuIds = this.userSelecteds.map(x => x.id);
            ids.map(m => {
                if (!nhanSuIds.includes(m)) {
                    const user = this.gridView.data.find(x => x.id === m);
                    this.userSelecteds.push({
                        id: user.id,
                        userName: user.userName,
                    });
                }
            });
            this.selectAllState = 'checked';
        } else {
            const nhanSuIds = this.userSelecteds.map(x => x.id);
            ids.map(m => {
                if (nhanSuIds.includes(m)) {
                    const findIdx = this.userSelecteds.findIndex(x => x.id === m);
                    if (findIdx > -1) {
                        this.userSelecteds.splice(findIdx, 1);
                    }
                }
            });
            this.selectAllState = 'unchecked';
        }
    }

    onSelectedUser(dataItem, $event) {
        if ($event.target.checked) {
            this.userSelecteds.push({
                id: dataItem.id,
                userName: dataItem.userName,
            });
        } else {
            const findIdx = this.userSelecteds.findIndex(m => m.id === dataItem.id);
            if (findIdx > -1) {
                this.userSelecteds.splice(findIdx, 1);
            }
        }
    }

    /**
     * Loads data via api service
     */
    protected loadItems() {
        this.isLoading = true;
        this.apiService
            .post(UrlConstant.API.ACL_USER + '/GetUser', this.queryOptions, true)
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result.items,
                            total: res.result.pagingInfo?.totalItems,
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
                finalize(() => (this.isLoading = false)),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.gridView = res;
            });
    }
}
