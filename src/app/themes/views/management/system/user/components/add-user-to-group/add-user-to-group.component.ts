import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageConfig } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { IUser } from '@core/models/users/users.model';
import { PermissionService } from '@core/services/business/permission.service';
import { NotificationService } from '@core/services/common/notification.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-add-user-to-group',
    templateUrl: './add-user-to-group.component.html',
    styleUrls: ['./add-user-to-group.component.scss'],
    providers: [PermissionService],
})
export class AddUserToGroupComponent implements OnInit, OnDestroy {
    @Input() idGroupPermission: number;

    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    selectionIds: number[] = [];
    pageConfig: PagerSettings | boolean = PageConfig;
    loading = false;

    searchControl = new FormControl();

    private destroyed$ = new Subject();
    constructor(
        private permissionService: PermissionService,
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.loadUserForSelect();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadUserForSelect();
    }

    onSubmit() {
        if (this.selectionIds.length > 0) {
            const body = {
                idGroupPermission: this.idGroupPermission,
                idUsers: this.selectionIds,
            };
            this.permissionService
                .addUserToCreationGroup(body)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(() => {
                    this.notification.showSuccessMessage('Thêm người dùng tạo nhóm thành công !');
                    this.closeForm(true);
                });
        } else {
            this.notification.showWarningMessage('Chưa chọn người dùng !');
        }
    }

    closeForm(isLoad) {
        this.windowRef.close(isLoad);
    }

    onSearchChange() {
        this.loadUserForSelect();
    }

    private loadUserForSelect() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.ACL_USER, this.queryOptions).pipe(
            map(
                res => {
                    const results = res.result as IPagedResult<IUser[]>;
                    if (res.result) {
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
            keyword: this.searchControl.value,
        };
    }
}
