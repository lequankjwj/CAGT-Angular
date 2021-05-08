import { NotificationService } from '@core/services/common/notification.service';
import { Component, OnDestroy, OnInit, ViewChild, Injectable, ElementRef } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { DataResult, GroupDescriptor, process } from '@progress/kendo-data-query';
import {
    IGridGroupPermission,
    IPermisisonOfUser,
    ITreeGroupPermission,
    LoaiBoSungQuyenEnum,
    LoaiKeThuaQuyenEnum,
    LoaiThuHoiQuyenEnum,
} from '@core/models/permissions/permission.model';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { PermissionService } from '@core/services/business/permission.service';
import { ActionEnum } from '@core/constants/enum.constant';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroupPermissionComponent } from '../../components/form-group-permission/form-group-permission.component';
import { WindowService } from '@progress/kendo-angular-dialog';
import { ModalDeleteConfig } from '@core/constants/app.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { AddUserToGroupComponent } from '../../components/add-user-to-group/add-user-to-group.component';
import { ListUserCreateGroupComponent } from '@themes/views/management/system/user/components/list-user-create-group/list-user-create-group.component';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';

@Injectable()
export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(50, 250, 500);
    }
}

@Component({
    selector: 'app-permission-of-group',
    templateUrl: './permission-of-group.component.html',
    styleUrls: ['./permission-of-group.component.scss'],
    providers: [PermissionService, { provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }],
})
export class PermissionOfGroupComponent implements OnInit, OnDestroy {
    @ViewChild(GridComponent) private gridPermission: GridComponent;
    @ViewChild('treeviewGroupPermission') treeview: ElementRef;
    @ViewChild('treemenu') treeContextMenu: ContextMenuComponent;
    private contextItem: any;

    opened = false;
    nodeUsers: ITreeGroupPermission[] = [];
    nodePermissions: IGridGroupPermission[] = [];
    nodePermissionExpaned: Array<boolean> = [];
    parsedData: ITreeGroupPermission[] = [];

    groups: GroupDescriptor[] = [{ field: 'gF_GroupName' }, { field: 'gF_Name' }];

    gridView: DataResult;

    keThuaQuyenValue = 0;

    searchTerm = '';

    userId: number;

    userTree: ITreeGroupPermission;

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

    menuActions = [
        {
            type: ActionEnum.CREATE,
            text: 'Tạo nhóm quyền con',
            action: 'AddGroup',
        },
        {
            type: ActionEnum.UPDATE,
            text: 'Cập nhật',
            action: 'UpdateGroup',
        },
        {
            type: ActionEnum.DELETE,
            text: 'Xóa',
            action: 'DeleteGroup',
        },
        {
            type: ActionEnum.CREATE,
            text: 'Thêm người dùng tạo nhóm',
            action: 'AddUserToGroup',
        },
    ];

    private action: ActionEnum;
    private modelGroupPermission: ITreeGroupPermission;
    private parentId: number;
    private destroyed$ = new Subject();

    constructor(
        private apiService: ApiService,
        private permissionService: PermissionService,
        private translate: CustomTranslateService,
        private modal: NzModalService,
        private windowService: WindowService,
        private notification: NotificationService
    ) {}

    ngOnInit() {
        // this.loadUserTree();
        this.loadGroupPermission();
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
            if (x.lstOfOption) {
                x.lstOfOption
                    .filter(m => m.isCheck)
                    .map(m => {
                        arrayOptional.push(m.a_Id);
                    });
            }
        });
        const permissions = {
            idGroupPermission: Number.parseInt(this.userTree.location.split('->')[0], 10),
            idSelected: this.userTree.idGroupPermission,
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

        this.permissionService
            .savePermission(permissions)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.notification.showSuccessMessage('Cập nhật quyền thành công !');
            });
    }

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
                this.currentUserId = this.nodeUsers[0].idGroupPermission;
                this.expandedKeys = [this.currentUserId];
                this.parsedData = [...this.nodeUsers];

                this.loadPermissions();
            });
    }

    /**
     * Determines whether select action tree on
     * @param { item }
     */
    onSelectActionTree({ item }): void {
        this.action = item.type;
        switch (item.action) {
            case 'AddGroup':
                this.parentId = this.contextItem.idGroupPermission;
                this.showFormGroupPermission();
                break;
            case 'UpdateGroup':
                this.parentId = this.contextItem.idParent;
                this.modelGroupPermission = this.contextItem;
                this.showFormGroupPermission();
                break;
            case 'DeleteGroup':
                this.removeGroupPermission(this.contextItem.idGroupPermission);
                break;
            case 'AddUserToGroup':
                this.showListAddToUserCreateGroup();
                break;
        }
    }

    /**
     * Removes group permission
     * @param idGroupPermission
     */
    private removeGroupPermission(idGroupPermission: number) {
        const body = {
            ids: [idGroupPermission],
        };
        this.modal.confirm({
            nzTitle: ModalDeleteConfig.title,
            nzContent: ModalDeleteConfig.content,
            nzOkText: ModalDeleteConfig.yes,
            nzOkType: 'danger',
            nzOnOk: () => {
                this.permissionService
                    .removeGroupPermission(body)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        this.loadGroupPermission();
                    });
            },
            nzCancelText: ModalDeleteConfig.no,
            nzOnCancel: () => {},
        });
    }

    /**
     * Shows form group permission
     */
    private showFormGroupPermission() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.action === ActionEnum.CREATE ? 'Tạo nhóm quyền' : 'Cập nhật nhóm quyền',
            content: FormGroupPermissionComponent,
            width: 550,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.modelGroupPermission;
        param.parentId = this.parentId;

        windowRef.result.subscribe(result => {
            if (result === true) {
                this.loadGroupPermission();
            }
            this.opened = false;
        });
    }

    private showFormAddUserToGroup() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Nhóm ',
            content: AddUserToGroupComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.idGroupPermission = this.contextItem.idGroupPermission;

        windowRef.result.subscribe(result => {
            if (result === true) {
                this.loadGroupPermission();
            }
            this.opened = false;
        });
    }

    private showListAddToUserCreateGroup() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Danh sách người dùng thuộc nhóm ',
            content: ListUserCreateGroupComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.idGroupPermission = this.contextItem.idGroupPermission;

        windowRef.result.subscribe(result => {
            if (result === true) {
                this.loadGroupPermission();
            }
            this.opened = false;
        });
    }

    /**
     * Trees click
     * @param $event
     */
    treeClick($event) {
        if ($event.type === 'click') {
            const dataItem = $event.item?.dataItem as ITreeGroupPermission;
            if (dataItem) {
                this.userTree = dataItem;
                this.userId = dataItem.idGroupPermission;
                if (dataItem.idGroupPermission === this.findRootTree(dataItem.location)) {
                    this.currentUserId = dataItem.idGroupPermission;
                    // set is current group
                    this.isCurrentUser = this.userId === this.currentUserId;
                    this.loadPermissions();
                } else {
                    // Click vào node con
                    if (this.currentUserId === this.findRootTree(dataItem.location)) {
                        // set is current group
                        this.isCurrentUser = this.userId === this.currentUserId;
                        this.onSelectUserTree();
                    } else {
                        // set idGroupPermission
                        this.currentUserId = this.findRootTree(dataItem.location);
                        this.isCurrentUser = this.userId === this.currentUserId;
                        this.loadPermissions();
                    }
                }
            }
        }

        if ($event.type === 'contextmenu') {
            const originalEvent = $event.originalEvent;
            originalEvent.preventDefault();
            this.contextItem = $event.item.dataItem;

            // Get Index Level
            // this.treeLevelIndex = (e.item.index.split('_').length -
            //     1) as TreeNganHangCauHoiEnum;

            if (this.contextItem) {
                this.parentId = this.contextItem.idGroupPermission;
                // this.treeNodeExam.id = this.contextItem.id;
                // this.treeNodeExam.parentName = this.contextItem.text;

                // set model when click tree node
                // this.model = this.contextItem;
            }
            // this.menuActions = this.items.filter(
            //     (x) => x.type === this.treeLevelIndex && x.isEnabled
            // );

            this.treeContextMenu.show({
                left: originalEvent.pageX,
                top: originalEvent.pageY,
            });
        }
    }

    /**
     * Select user tree on
     */
    onSelectUserTree() {
        const selectUser$ = this.apiService
            .post(`${UrlConstant.API.ACL_PERMISSION_GROUP_ACTION}/GetArrCkbPermissionActionGroup`, {
                idGroupPermission: this.userId,
                groupId: null,
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
                    if (x.lstOfOption && x.lstOfOption.length > 0) {
                        x.lstOfOption.forEach(c => {
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
                    if (x.lstOfOption && x.lstOfOption.length > 0) {
                        x.lstOfOption.forEach(c => {
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
        this.permissionService
            .getActionByGroup({
                idGroupPermission: this.currentUserId,
                groupId: null,
            })
            .pipe(
                takeUntil(this.destroyed$),
                tap((res: IGridGroupPermission[]) => {
                    this.nodePermissions = res;
                    this.nodePermissions.map(node => (node.state = false));

                    this.loadGrid();
                })
            )
            .subscribe();
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
                if (x.lstOfOption && x.lstOfOption.length > 0) {
                    x.lstOfOption.forEach(c => {
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
            const parentId = features[0].gF_Id;
            // set value checkbox
            this.nodePermissions
                .filter(x => x.gF_Id === parentId)
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
                    if (x.lstOfOption && x.lstOfOption.length > 0) {
                        x.lstOfOption.forEach(c => {
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
     * @param expanded
     */
    toggleItemInGroups(grid, index, child, expanded) {
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
        this.nodePermissionExpaned = this.gridView.data.map(() => false);
        this.gridView.data.forEach((child, index) => {
            child.items.forEach((_, idx) => this.gridPermission.expandGroup(`${index}_${idx}`));
        });

        if (this.userId !== this.currentUserId) {
            this.onSelectUserTree();
        }
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

    private findRootTree(location) {
        const convertArray = location.split('->');
        if (convertArray && convertArray.length > 0) {
            return Number.parseInt(convertArray[0], 10);
        }
        return 0;
    }
}
