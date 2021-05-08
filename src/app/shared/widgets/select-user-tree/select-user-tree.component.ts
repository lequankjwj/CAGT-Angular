import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DepartmentService } from '@management-state/department/department.service';
import { ITreeCoQuan } from '@themes/views/management/human-resource/_models/co-quan.model';
import { NgxSpinnerService } from 'ngx-spinner';

export interface ITreeSelect {
    title: string;
    value: string;
    key: string;
    capDonVi?: number;
    coQuanTrucThuocId?: number;
    children?: ITreeSelect[];
    isLeaf?: boolean;
}

@Component({
    selector: 'app-select-user-tree',
    templateUrl: './select-user-tree.component.html',
    styleUrls: ['./select-user-tree.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectUserTreeComponent),
        },
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SelectUserTreeComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() userSelectedIds?: number[] = [];
    @Input() placeholder = 'Chọn cơ quan';
    @Input() isMultiple = true;
    @Input() isLoadCapDonVi = false;
    @Input() isDisabled = false;

    @Output() selected: string;
    value: Array<string> | string;

    treeCoQuans: NzTreeNodeOptions[] = [];

    expandKeys = [];
    isLoading = false;

    private destroyed$ = new Subject();

    constructor(private departmentService: DepartmentService, private spinner: NgxSpinnerService) {}

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
        this.loadTreeCoQuan();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadTreeCoQuan() {
        this.departmentService
            .getDepartments()
            .pipe(
                map(res => this.setTreeValue(res)),
                takeUntil(this.destroyed$)
            )
            .subscribe();
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.expandKeys = [firstValue.coQuanId.toString()];
            this.treeCoQuans = this.convertToTree(res, firstValue.capDonVi, 0);
        }
    }

    private convertToTree(arr: ITreeCoQuan[], level, parentId): ITreeSelect[] {
        const treeSelect: ITreeSelect[] = arr
            .filter(
                m => (m.capDonVi === level && parentId <= 0) || (m.capDonVi === level && m.coQuanTrucThuocId === parentId && parentId > 0)
            )
            .filter(m => (this.isLoadCapDonVi && m.capDonVi < 2) || !this.isLoadCapDonVi)
            .map(m => {
                return {
                    title: m.tenCoQuan,
                    value: m.coQuanId.toString(),
                    key: m.coQuanId.toString(),
                    capDonVi: m.capDonVi,
                    coQuanTrucThuocId: m.coQuanTrucThuocId,
                    expanded: false,
                    children: [],
                    isLeaf: false,
                };
            });

        if (treeSelect.length > 0) {
            treeSelect.map(item => {
                const childs = arr.filter(m => m.coQuanTrucThuocId === Number.parseInt(item.value, 10));
                if (childs.length > 0) {
                    item.children =
                        this.convertToTree(arr, item.capDonVi + 1, Number.parseInt(item.value, 10)).length < 1
                            ? null
                            : this.convertToTree(arr, item.capDonVi + 1, Number.parseInt(item.value, 10));
                    // set isLeaf = true;
                    if (this.isLoadCapDonVi && item.capDonVi === 1) {
                        item.isLeaf = true;
                    }
                } else {
                    item.isLeaf = true;
                }
            });
        }

        return treeSelect;
    }
}
