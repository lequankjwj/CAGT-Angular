import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '@core/data-services/api.service';
import {UtilService} from '@core/services/common/util.service';
import {ModalDeleteConfig, PageConfig} from '@core/constants/app.constant';
import {UrlConstant} from '@core/constants/url.constant';
import {finalize, map, takeUntil, tap} from 'rxjs/operators';
import {IPagedResult, IResponseData} from '@core/models/common/response-data.model';
import {IUserDevice} from '@core/auth/user-token.model';
import {MenuQuery} from '@management-state/menu/menu.query';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NotificationService} from '@core/services/common/notification.service';
import {BaseUserComponent} from '@themes/views/management/system/user/_base/base-user.component';
import {AuthenticateService} from '@core/auth';

@Component({
    selector: 'app-history-current-user',
    templateUrl: './history-current-user.component.html',
    styleUrls: ['./history-current-user.component.css'],
})
export class HistoryCurrentUserComponent extends BaseUserComponent<IUserDevice> implements OnInit, OnDestroy {
    keyLogin: string;

    constructor(
        private apiService: ApiService,
        protected menuQuery: MenuQuery,
        private modal: NzModalService,
        private notification: NotificationService,
        private auth: AuthenticateService
    ) {
        super(menuQuery);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.keyLogin = this.auth.getCookieKeyLogin();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    loadItems() {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.ACL_USER_DEVICE_DETAIL, this.queryOptions, true).pipe(
            map((res: IResponseData<IPagedResult<IUserDevice[]>>) => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result?.items,
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

    logoutHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.sessionCode);
        this.logoutAllDeviceSelectedHandler();
    }

    /**
     * Removes multiple selected handler
     */
    logoutAllDeviceSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                listOfSessionCode: this.selectionIds,
                isCurrentUserLogout: false,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: 'Bạn có muốn đăng xuất khỏi thiết bị đã chọn ?',
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.apiService.post(UrlConstant.API.ACL_ACCOUNT + '/Logout', body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            this.notification.showSuccessMessage('Đăng xuất thành công !');
                            this.gridState.skip = 0;
                            this.loadItems();
                            this.selectionIds = [];
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {
                },
            });
        }
    }

    protected openForm() {
    }
}
