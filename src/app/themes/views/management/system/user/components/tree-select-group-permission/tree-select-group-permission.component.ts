import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ITreeGroupPermission } from '@core/models/permissions/permission.model';
import { PermissionService } from '@core/services/business/permission.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-tree-select-group-permission',
    templateUrl: './tree-select-group-permission.component.html',
    styleUrls: ['./tree-select-group-permission.component.scss'],
    providers: [
        PermissionService,
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TreeSelectGroupPermissionComponent),
        },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class TreeSelectGroupPermissionComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() userSelectedIds?: number[] = [];
    @Input() placeholder = 'Chọn cơ quan';
    @Input() isMultiple = true;
    @Output() selected: string;
    value: Array<string> | string;

    treeGroupPemissions: NzTreeNodeOptions[] = [];

    expandKeys = [];
    isLoading = false;

    private destroyed$ = new Subject();

    constructor(private permissionService: PermissionService, private spinner: NgxSpinnerService) {}

    onChange: (value: any) => void;

    onTouched: () => void;

    ngOnChanges(changes: SimpleChanges) {
        if (this.userSelectedIds.length === 0) {
            this.value = [];
            this.writeValue(this.value);
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(obj) {
        if (typeof obj === 'number') {
            this.value = obj.toString();
        } else {
            this.value = obj || [];
        }

        this.userSelectedIds = obj || [];
    }

    ngOnInit(): void {
        setTimeout(() => this.spinner.hide(), 0);
        this.loadTreeGroupPermission();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadTreeGroupPermission() {
        this.permissionService
            .getGroupForTree(null, null)
            .pipe(
                takeUntil(this.destroyed$),
                map(res => this.setTreeValue(res))
            )
            .subscribe();
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.expandKeys = [firstValue.idGroupPermission.toString()];
            this.treeGroupPemissions = this.convertToTree(res, 0, -1);
        }
    }

    private convertToTree(arr: ITreeGroupPermission[], level, parentId): NzTreeNodeOptions[] {
        const treeSelect: NzTreeNodeOptions[] = arr
            .filter(m => (level < 1 && m.level < 1) || (level > 0 && m.idParent > 0 && m.idParent === parentId))
            .map(m => {
                return {
                    title: m.groupName,
                    value: m.idGroupPermission.toString(),
                    key: m.idGroupPermission.toString(),
                    idParent: m.idParent,
                    idGroupPermission: m.idGroupPermission,
                    groupName: m.groupName,
                    expanded: false,
                    level: m.level,
                    children: [],
                    isLeaf: false,
                };
            });

        if (treeSelect.length > 0) {
            treeSelect.map(item => {
                const childs = arr.filter(m => m.idParent === item.idGroupPermission);
                if (childs.length > 0) {
                    item.children =
                        this.convertToTree(arr, item.level + 1, item.idGroupPermission).length < 1
                            ? null
                            : this.convertToTree(arr, item.level + 1, item.idGroupPermission);
                } else {
                    item.isLeaf = true;
                }
            });
        }

        return treeSelect;
    }
}
