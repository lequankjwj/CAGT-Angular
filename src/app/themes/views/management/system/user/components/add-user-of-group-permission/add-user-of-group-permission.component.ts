import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { PermissionService } from '@core/services/business/permission.service';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { UrlConstant } from '@core/constants/url.constant';
import { IPagedResult } from '@core/models/common/response-data.model';
import { IUser } from '@core/models/users/users.model';
import { ITreeCoQuan } from '@themes/views/management/human-resource/_models/co-quan.model';
import { ICoQuan } from '@themes/views/management/catalogs/_models/catalog.model';
import { DepartmentService } from '@management-state/department/department.service';

@Component({
    selector: 'app-add-user-of-group-permission',
    templateUrl: './add-user-of-group-permission.component.html',
    styleUrls: ['./add-user-of-group-permission.component.scss'],
})
export class AddUserOfGroupPermissionComponent implements OnInit, OnDestroy {
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

    groupPermissionControl = new FormControl();
    searchControl = new FormControl();

    expandKey = [];
    treeCoQuans: ITreeCoQuan[];
    parsedData: ITreeCoQuan[];
    itemCoQuanSelected: ICoQuan;

    searchValue = '';

    pageHeightTree = window.innerHeight - 55;
    pageHeightGrid = window.innerHeight - 120;

    private coQuanId: number;
    private destroyed$ = new Subject();

    constructor(
        private permissionService: PermissionService,
        private apiService: ApiService,
        private notification: NotificationService,
        private departmentService: DepartmentService,
        private formBuilder: FormBuilder,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        if (this.idGroupPermission) {
            this.groupPermissionControl.setValue(this.idGroupPermission);
        }
        this.loadTreeCoQuan();

        // group pemission change
        this.groupPermissionControl.valueChanges.subscribe(() => {
            this.gridState.skip = 0;
            this.loadUserForSelect();
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadUserForSelect();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadUserForSelect();
    }

    onSubmit() {
        if (this.selectionIds.length > 0) {
            if (!this.groupPermissionControl.value) {
                this.notification.showWarningMessage('Chưa chọn nhóm quyền !');
                return;
            }
            const body = {
                idUsers: this.selectionIds,
                idGroupPermission: Number.parseInt(this.groupPermissionControl.value, 10),
            };
            this.permissionService
                .addUserToGroupPermission(body)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(() => {
                    this.notification.showSuccessMessage('Thêm người dùng vào nhóm thành công !');
                    this.closeForm({
                        isLoad: true,
                        idGroupPermission: body.idGroupPermission,
                    });
                });
        } else {
            this.notification.showWarningMessage('Chưa chọn nhân sự !');
        }
    }

    closeForm(isLoad) {
        this.windowRef.close(isLoad);
    }

    /**
     * Trees click
     * @param $event
     */
    treeClick($event) {
        if ($event.type === 'click') {
            const dataItem = $event.item?.dataItem;
            if (dataItem) {
                // set user
                this.coQuanId = dataItem.coQuanId;
                // load user by co quan id
                this.loadUserForSelect();
            }
        }
    }

    onkeyup(textSearch: string): void {
        this.parsedData = this.search(this.treeCoQuans, textSearch);
    }

    private loadTreeCoQuan() {
        this.departmentService
            .getDepartments(null)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => this.setTreeValue(res));
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.expandKey = [firstValue.coQuanId];

            // set coQuanId
            this.coQuanId = firstValue.coQuanId;
            this.treeCoQuans = this.convertToTree(res, firstValue.capDonVi, 0);
            this.parsedData = [...this.treeCoQuans];

            // load user
            this.loadUserForSelect();

            // search
            this.itemCoQuanSelected = firstValue;
        }
    }

    private convertToTree(arr: ITreeCoQuan[], level, parentId): ITreeCoQuan[] {
        const tree = arr.filter(
            m => (m.capDonVi === level && parentId <= 0) || (m.capDonVi === level && m.coQuanTrucThuocId === parentId && parentId > 0)
        );
        if (tree.length > 0) {
            tree.map(item => {
                const childs = arr.filter(m => m.coQuanTrucThuocId === item.coQuanId);
                if (childs.length > 0) {
                    item.childrens = this.convertToTree(arr, item.capDonVi + 1, item.coQuanId);
                }
            });
        }

        return tree;
    }

    private search(items: any[], textSearch: string): any[] {
        return items.reduce((acc, item) => {
            if (this.contains(item.tenCoQuan, textSearch)) {
                acc.push(item);
            } else if (item.childrens && item.childrens.length > 0) {
                const newItems = this.search(item.childrens, textSearch);

                if (newItems.length > 0) {
                    acc.push({
                        tenCoQuan: item.tenCoQuan,
                        coQuanId: item.coQuanId,
                        maCoQuan: item.maCoQuan,
                        coQuanTrucThuocId: item.coQuanTrucThuocId,
                        capDonVi: item.capDonVi,
                        childrens: newItems,
                    });
                }
            }

            return acc;
        }, []);
    }

    private contains(text: string, term: string): boolean {
        return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }

    private loadUserForSelect() {
        this.loading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.ACL_USER + '/UserBelongToCoQuan', this.queryOptions).pipe(
            map(res => {
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
            }),
            finalize(() => (this.loading = false))
        );
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            keyword: this.searchControl.value,
            idCoQuan: this.coQuanId,
            idGroupPermission: this.groupPermissionControl.value ? Number.parseInt(this.groupPermissionControl.value) : null,
            sortCol: this.gridState.sort[0].field,
            isAsc: this.gridState.sort[0].dir === 'asc',
        };
    }
}
