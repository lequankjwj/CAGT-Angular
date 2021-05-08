import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDeleteConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult } from '@core/models/common/response-data.model';
import { ITreeGroupPermission } from '@core/models/permissions/permission.model';
import { IUser } from '@core/models/users/users.model';
import { PermissionService } from '@core/services/business/permission.service';
import { NotificationService } from '@core/services/common/notification.service';
import { GridDataResult, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { finalize, map, pluck, takeUntil } from 'rxjs/operators';
import { MessageConstant } from '@core/constants/message.constant';
import { WindowService } from '@progress/kendo-angular-dialog';
import { AddUserOfGroupPermissionComponent } from '@themes/views/management/system/user/components/add-user-of-group-permission/add-user-of-group-permission.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
@Component({
    selector: 'app-user-of-group-permission',
    templateUrl: './user-of-group-permission.component.html',
    styleUrls: ['./user-of-group-permission.component.scss'],
    providers: [PermissionService],
})
export class UserOfGroupPermissionComponent implements OnInit, OnDestroy {
    opened = false;
    nodeUsers: ITreeGroupPermission[] = [];
    parsedData: ITreeGroupPermission[] = [];

    searchTerm = '';

    userId: number;
    expandedKeys = [0];

    gridView$: Observable<GridDataResult>;
    loading = false;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    selectionIds: number[] = [];

    groupPermissionControl = new FormControl();

    groupNameSeleced: string;
    private idGroupPermission: number;
    private destroyed$ = new Subject();

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    constructor(
        private apiService: ApiService,
        private permissionService: PermissionService,
        private translate: CustomTranslateService,
        private windowService: WindowService,
        private modal: NzModalService,
        private notification: NotificationService
    ) {}

    ngOnInit() {
        this.loadGroupPermission();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    ngAfterViewInit() {}

    showFormAddUserToGroupPermission() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Thêm người dùng vào nhóm phân quyền ',
            content: AddUserOfGroupPermissionComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.idGroupPermission = this.idGroupPermission;

        windowRef.result.subscribe((result: any) => {
            if (result.isLoad === true) {
                this.idGroupPermission = result.idGroupPermission;
                this.loadUserForSelect();
            }
            this.opened = false;
        });
    }

    /**
     * State change with fields: take, skip, sort
     * @param state
     */
    onStateChange(state: State) {
        this.gridState = state;
        this.loadUserForSelect();
    }

    /**
     * Loads group permission
     */
    loadGroupPermission() {
        this.permissionService
            .getGroupForTree(null, null)
            .pipe(takeUntil(this.destroyed$))
            .pipe(
                map(res => {
                    return this.toTree(res, 0, -1);
                })
            )
            .subscribe(res => {
                this.nodeUsers = res;
                this.expandedKeys = [this.nodeUsers[0].idGroupPermission];
                this.parsedData = [...this.nodeUsers];

                // set idGroupPermission
                this.idGroupPermission = this.nodeUsers[0].idGroupPermission;
                this.loadUserForSelect();
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
                        .removeUserFromGroupPermission(body)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(() => {
                            this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                            this.gridState.skip = 0;
                            this.loadUserForSelect();
                            this.selectionIds = [];
                        });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    /**
     * Trees click
     * @param $event
     */
    treeClick($event) {
        if ($event.type === 'click') {
            const dataItem = $event.item?.dataItem;
            if (dataItem) {
                // load user by group permission
                this.groupNameSeleced = dataItem.groupName;
                this.idGroupPermission = dataItem.idGroupPermission;
                this.loadUserForSelect();
            }
        }
    }

    /**
     * Onkeyups permission component
     */
    onkeyup(): void {}

    private loadUserForSelect() {
        this.loading = true;
        this.gridView$ = this.permissionService.getUserFromGroupPermisisonForSelect(this.queryOptions).pipe(
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
            keyword: '',
        };
    }

    /**
     * To tree
     * @param arr
     * @param level
     * @param parentId
     * @returns
     */
    private toTree(arr: ITreeGroupPermission[], level, parentId): ITreeGroupPermission[] {
        const users = arr.filter(m => (level < 1 && m.level < 1) || (level > 0 && m.idParent > 0 && m.idParent === parentId));
        if (users.length > 0) {
            users.map(item => {
                item.key = item.idGroupPermission;
                const childs = arr.filter(m => m.idParent === item.idGroupPermission);
                if (childs.length > 0) {
                    item.childrens = this.toTree(arr, item.level + 1, item.idGroupPermission);
                }
            });
        }

        return users;
    }

    private searchTreeView(items: any[], term: string): any[] {
        return items.reduce((acc, item) => {
            if (this.contains(item.name, term)) {
                acc.push(item);
            } else if (item.childrens && item.childrens.length > 0) {
                const newItems = this.searchTreeView(item.childrens, term);
                if (newItems.length > 0) {
                    acc.push({ name: item.name, childrens: newItems });
                }
            }

            return acc;
        }, []);
    }

    private contains(text: string, term: string): boolean {
        // return text.search(term) >= 0;
        return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }
}
