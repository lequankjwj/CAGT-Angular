import { NotificationService } from '@core/services/common/notification.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Injectable } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { DataResult, GroupDescriptor, process } from '@progress/kendo-data-query';
import {
    IGridPermission,
    IPermisisonOfUser,
    ITreeUser,
    LoaiBoSungQuyenEnum,
    LoaiKeThuaQuyenEnum,
    LoaiThuHoiQuyenEnum,
} from '@core/models/permissions/permission.model';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

@Injectable()
export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(50, 250, 500);
    }
}

@Component({
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }],
})
export class PermissionComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(GridComponent) private gridPermission: GridComponent;
    nodeUsers: ITreeUser[] = [];
    nodePermissions: IGridPermission[] = [];
    nodePermissionExpaned: Array<boolean> = [];
    parsedData: ITreeUser[] = [];

    groups: GroupDescriptor[] = [{ field: 'g_GroupName' }, { field: 'g_Name' }];

    gridView: DataResult;

    keThuaQuyenValue = 0;

    searchTerm = '';

    userId: number;

    userTree: ITreeUser;

    loaiBoSungQuyenEnum = LoaiBoSungQuyenEnum;
    loaiThuHoiQuyenEnum = LoaiThuHoiQuyenEnum;
    loaiKeThuaQuyenEnum = LoaiKeThuaQuyenEnum;

    modelOptional = {
        typeOfAddition: this.loaiBoSungQuyenEnum.KhongApDung,
        typeOfWithdraw: this.loaiThuHoiQuyenEnum.ThuHoiTatCa,
        typeOfInherited: this.loaiKeThuaQuyenEnum.KhongApDung,
    };

    isCurrentUser = true;
    currentUserId: number;
    expandedKeys = [0];

    private destroyed$ = new Subject();

    constructor(private apiService: ApiService, private notification: NotificationService) {}

    ngOnInit() {
        this.loadUserTree();
        this.loadPermissions();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    ngAfterViewInit() {}

    /**
     * Saves permission
     */
    savePermission() {
        const arrayOptional = [];
        this.nodePermissions.map(x => {
            if (x.lstOption) {
                x.lstOption
                    .filter(m => m.isCheck)
                    .map(m => {
                        arrayOptional.push(m.a_Id);
                    });
            }
        });
        const permissions = {
            idSelected: this.userId,
            typeOfAddition: this.modelOptional.typeOfAddition,
            typeOfWithdraw: this.modelOptional.typeOfWithdraw,
            typeOfInherited: this.modelOptional.typeOfInherited,
            arrIdInherited: [],
            arrAclView: this.nodePermissions.filter(m => m.isView).map(m => m.f_Id),
            arrAclAdd: this.nodePermissions.filter(m => m.isAdd).map(m => m.f_Id),
            arrAclEdit: this.nodePermissions.filter(m => m.isEdit).map(m => m.f_Id),
            arrAclDelete: this.nodePermissions.filter(m => m.isDelete).map(m => m.f_Id),
            arrAclOption: arrayOptional,
        };

        const updatePermission$ = this.apiService.post(`${UrlConstant.API.ACL_PERMISSION}`, permissions).pipe(takeUntil(this.destroyed$));
        updatePermission$.subscribe(() => {
            // success
            this.notification.showSuccessMessage('Cập nhật quyền người dùng thành công !');
        });
    }

    /**
     * Loads user tree
     */
    loadUserTree() {
        const treeUser$ = this.apiService.post(`${UrlConstant.API.ACL_PERMISSION}/GetTree`, {}).pipe(
            takeUntil(this.destroyed$),
            map(res => {
                return this.toTree(res.result, 0, -1);
            })
        );
        treeUser$.subscribe(res => {
            if (res) {
                this.nodeUsers = res;
                // set current user id
                this.currentUserId = this.nodeUsers[0].id;
                this.expandedKeys = [this.currentUserId];
                this.parsedData = [...this.nodeUsers];
            }
        });
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
                this.userTree = dataItem;
                this.userId = dataItem.id;
                this.isCurrentUser = this.userId === this.currentUserId;
                this.onSelectUserTree();
            }
        }
    }

    /**
     * Select user tree on
     */
    onSelectUserTree() {
        const selectUser$ = this.apiService
            .post(`${UrlConstant.API.ACL_PERMISSION}/GetArrCkbPermission`, {
                idUser: this.userId,
            })
            .pipe(takeUntil(this.destroyed$));

        selectUser$.subscribe(res => {
            if (res.result) {
                const permisionOfUser = res.result as IPermisisonOfUser;
                this.nodePermissions.map(x => {
                    if (x.isView !== null) {
                        x.isView = permisionOfUser.arrAclView.includes(x.f_Id);
                    }

                    if (x.isAdd !== null) {
                        x.isAdd = permisionOfUser.arrAclAdd.includes(x.f_Id);
                    }

                    if (x.isEdit !== null) {
                        x.isEdit = permisionOfUser.arrAclEdit.includes(x.f_Id);
                    }

                    if (x.isDelete !== null) {
                        x.isDelete = permisionOfUser.arrAclDelete.includes(x.f_Id);
                    }
                    x.isHasRole = false;
                    if (x.lstOption && x.lstOption.length > 0) {
                        x.lstOption.forEach(c => {
                            if (c.isCheck !== null) {
                                c.isCheck = permisionOfUser.arrAclOption.includes(c.a_Id);
                            }
                        });
                    }
                });
            } else {
                // reset permission to empty
                this.nodePermissions.map(x => {
                    if (x.isView !== null) {
                        x.isView = false;
                    }

                    if (x.isAdd !== null) {
                        x.isAdd = false;
                    }

                    if (x.isEdit !== null) {
                        x.isEdit = false;
                    }

                    if (x.isDelete !== null) {
                        x.isDelete = false;
                    }
                    x.isHasRole = false;
                    if (x.lstOption && x.lstOption.length > 0) {
                        x.lstOption.forEach(c => {
                            if (c.isCheck !== null) {
                                c.isCheck = false;
                            }
                        });
                    }
                });
            }
        });
    }

    /**
     * Loads permissions
     */
    loadPermissions() {
        const permission$ = this.apiService.post(`${UrlConstant.API.ACL_PERMISSION}/GetPermission`, {}).pipe(takeUntil(this.destroyed$));
        permission$.subscribe(res => {
            this.nodePermissions = res.result as IGridPermission[];
            this.nodePermissions.map(node => (node.state = false));

            this.loadGrid();
        });
    }

    /**
     * Onkeyups permission component
     * @param value
     */
    onkeyup(value: string): void {
        this.parsedData = this.searchTreeView(this.nodeUsers, value);
        this.expandedKeys = [this.currentUserId];
    }

    /**
     * Groups change
     * @param groups
     */
    groupChange(groups: GroupDescriptor[]): void {
        this.groups = groups;
    }

    /**
     * Sets ke thua quyen
     * @param $event
     */
    setKeThuaQuyen($event) {
        this.keThuaQuyenValue = $event.target.value;
    }

    /**
     * Sets permission
     * @param $event
     * @param dataItem
     */
    setPermission($event, dataItem) {
        const checked = $event.target.checked;
        // set check for all checkbox inline row
        this.nodePermissions
            .filter(x => x.f_Id === dataItem.f_Id)
            .map(x => {
                if (x.isView !== null) {
                    x.isView = checked;
                }

                if (x.isAdd !== null) {
                    x.isAdd = checked;
                }

                if (x.isEdit !== null) {
                    x.isEdit = checked;
                }

                if (x.isDelete !== null) {
                    x.isDelete = checked;
                }
                x.isHasRole = checked;
                if (x.lstOption && x.lstOption.length > 0) {
                    x.lstOption.forEach(c => {
                        if (c.isCheck !== null) {
                            c.isCheck = checked;
                        }
                    });
                }
            });
    }

    /**
     * Sets permission of group
     * @param $event
     * @param dataItem
     */
    setPermissionOfGroup($event, dataItem) {
        const checked = $event.target.checked;
        const features = dataItem.items as Array<any>;
        if (features.length > 0) {
            const parentId = features[0].g_Id;
            // set value checkbox
            this.nodePermissions
                .filter(x => x.g_Id === parentId)
                .map(x => {
                    if (x.isView !== null) {
                        x.isView = checked;
                    }

                    if (x.isAdd !== null) {
                        x.isAdd = checked;
                    }

                    if (x.isEdit !== null) {
                        x.isEdit = checked;
                    }

                    if (x.isDelete !== null) {
                        x.isDelete = checked;
                    }
                    x.isHasRole = checked;
                    if (x.lstOption && x.lstOption.length > 0) {
                        x.lstOption.forEach(c => {
                            if (c.isCheck !== null) {
                                c.isCheck = checked;
                            }
                        });
                    }
                });
        }
    }

    /**
     * Collapses groups header
     * @param grid
     */
    collapseGroups(grid) {
        if (Array.isArray(this.gridView.data)) {
            this.gridView.data.forEach((child, index) => {
                grid.collapseGroup(index.toString());
                child.items.forEach((_, idx) => grid.collapseGroup(`${index}_${idx}`));
            });
        }
    }

    /**
     * Expands groups header
     * @param grid
     */
    expandGroups(grid) {
        if (Array.isArray(this.gridView.data)) {
            this.gridView.data.forEach((child, index) => {
                grid.expandGroup(index.toString());

                child.items.forEach((_, idx) => grid.expandGroup(`${index}_${idx}`));
            });
        }
    }

    /**
     * Toggles item in groups
     * @param grid
     * @param index
     * @param child
     * @param state
     */
    toggleItemInGroups(grid, index, child, state) {
        const stateCurrentNode = this.nodePermissionExpaned[index];
        if (!stateCurrentNode) {
            if (Array.isArray(child.items)) {
                child.items.forEach((_, idx) => {
                    grid.collapseGroup(`${index}_${idx}`);
                });
            }
            this.nodePermissionExpaned[index] = true;
        } else {
            if (Array.isArray(child.items)) {
                child.items.forEach((_, idx) => {
                    grid.expandGroup(`${index}_${idx}`);
                });
            }
            this.nodePermissionExpaned[index] = false;
        }
    }

    private loadGrid() {
        this.gridView = process(this.nodePermissions, {
            group: this.groups,
        });
        this.nodePermissionExpaned = this.gridView.data.map(x => false);
        this.gridView.data.forEach((child, index) => {
            child.items.forEach((_, idx) => this.gridPermission.expandGroup(`${index}_${idx}`));
        });
    }

    /**
     * To tree
     * @param arr
     * @param level
     * @returns
     */
    private toTree(arr: ITreeUser[], level, parentId): ITreeUser[] {
        const users = arr.filter(m => (m.level === 0 && parentId < 0) || (m.level > 0 && m.level === level && m.parentId === parentId));
        if (users.length > 0) {
            users.map(item => {
                item.key = item.id;
                const childs = arr.filter(m => m.parentId === item.id);
                if (childs.length > 0) {
                    item.childrens = this.toTree(arr, item.level + 1, item.id);
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
