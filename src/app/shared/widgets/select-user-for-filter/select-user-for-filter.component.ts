import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INhanSu, INhanSuCoQuan, INhanSuCoQuanChucVu } from '@themes/views/management/human-resource/_models/human-resource.model';
import { UrlConstant } from '@core/constants/url.constant';
import { GridDataResult, SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { PageConfig } from '@core/constants/app.constant';
import { Observable, Subject } from 'rxjs';
import { ICoQuan } from '@themes/views/management/catalogs/_models/catalog.model';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { DepartmentService } from '@management-state/department/department.service';
import { NhanSuService } from '@management-state/nhan-su/nhan-su.service';
import { ITreeCoQuan } from '@themes/views/management/human-resource/_models/co-quan.model';
import { ApiService } from '@core/data-services/api.service';

@Component({
    selector: 'widget-select-user-for-filter',
    templateUrl: './select-user-for-filter.component.html',
    styleUrls: ['./select-user-for-filter.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectUserForFilterComponent),
        },
        WindowRef,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SelectUserForFilterComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    @Input() userSelectedIds?: number[] = [];
    @Input() dataSelected: any;
    @Input() placeholder = 'Chọn nhân sự';
    @Input() mode: string = 'default';
    @Input() dotDanhGiaChiTietId?: number; // (optional) search nhan su theo doi tuong trong DotDanhGia, chi lay nhung NS chua duoc chon trong dotDanhGiaChiTietId cua DotDanhGia
    @Input() doiTuongDanhGiaId?: number; // (optional) search nhan su theo doi tuong trong DotDanhGia, chi lay loai doiTuong de loc data
    @Input() manHinh?: number;
    @Input() coQuanId?: number; // Chọn nhân sự theo cơ quan


    @Output() listItems = new EventEmitter<any>();
    openedUser = false;

    nhanSus: INhanSu[];
    nhanSuCoQuanChucVus: INhanSuCoQuanChucVu[];
    nhanSuCoQuans: INhanSuCoQuan[];

    pageHeightTree = window.innerHeight - 115;
    pageHeightGrid = window.innerHeight - 175;

    treeCoQuans: ITreeCoQuan[];
    parsedData: ITreeCoQuan[];

    itemNhanSuDropdownSelected: any[] | any = [];
    userSelected = [];

    gridViewUser$: Observable<GridDataResult>;

    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    pageConfig = PageConfig;
    selectionIds = [];
    selectionNhanSus = [];
    itemCoQuanSelected: ICoQuan;
    searchValue = '';
    searchControl = new FormControl();
    doiTuongDanhGiaControl = new FormControl();

    dropdownListEnum = DropDownListEnum;

    expandKey = [];

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private windowRef: WindowRef,
        private departmentService: DepartmentService,
        private nhanSuService: NhanSuService
    ) {}

    onChange: (value: any[]) => void = () => {};
    // tslint:disable-next-line:ban-types
    onTouched: Function = () => {};

    ngOnChanges(changes: SimpleChanges) {
        if (this.userSelectedIds.length === 0) {
            this.itemNhanSuDropdownSelected = [];
            this.writeValue(this.itemNhanSuDropdownSelected);
        } else {
            this.itemNhanSuDropdownSelected = this.userSelectedIds;
            this.writeValue(this.itemNhanSuDropdownSelected);
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(obj: any) {
        this.userSelectedIds = obj || [];
        if (this.mode === 'default') {
            if (obj && obj.length > 0) {
                this.itemNhanSuDropdownSelected = obj[0];
            }
        }
    }

    ngOnInit() {
        if (this.doiTuongDanhGiaId) {
            this.doiTuongDanhGiaControl.setValue(this.doiTuongDanhGiaId);
        }
        this.loadTreeCoQuan();
        this.loadNhanSus();

        // Input Change
        this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.gridState.skip = 0;
            this.loadItemNhanSuByCoQuan();
        });

        // Input Change
        this.doiTuongDanhGiaControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.gridState.skip = 0;
            this.loadItemNhanSuByCoQuan();
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onChangeModel($event) {
        this.userSelected = [];
        if (this.mode === 'default') {
            this.userSelected.push(this.nhanSuCoQuanChucVus.find(y => y.nhanSuId === $event));
            this.onChange($event);
        } else {
            if ($event.length > 0) {
                $event.map(x => {
                    this.userSelected.push(this.nhanSuCoQuanChucVus.find(y => y.nhanSuId === x));
                });
            }
        }
        this.outputItems(this.userSelected);
    }

    openUserList(template: TemplateRef<any>) {
        this.openedUser = true;
        this.selectionIds = this.mode === 'default' ? [] : [...new Set(this.itemNhanSuDropdownSelected)];
        this.selectionNhanSus = [];
        this.windowRef = this.windowService.open({
            title: 'Chọn nhân sự',
            content: template,
            width: 1500,
            height: 800,
            top: 10,
            state: 'maximized',
            keepContent: true,
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
                this.itemCoQuanSelected = dataItem;
                // get user trong co quan
                this.loadItemNhanSuByCoQuan();
            }
        }
    }

    loadItemNhanSuByCoQuan() {
        this.gridViewUser$ = this.apiService.fetchPost(UrlConstant.API.HRM_NHAN_SU + '/ByCoQuan', this.queryOptions);
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItemNhanSuByCoQuan();
    }

    loadNhanSus() {
        this.nhanSuService
            .getNhanSuByCoQuan(0, 0, this.manHinh, this.coQuanId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => (this.nhanSuCoQuanChucVus = res));
    }

    loadTreeCoQuan() {
        this.departmentService
            .getDepartments(this.manHinh)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => this.setTreeValue(res));
    }

    selectedNhanSu() {
        if (this.selectionIds.length > 0) {
            this.openedUser = false;
            const listIdtemp = this.itemNhanSuDropdownSelected.concat(this.selectionIds);
            const listItemtemp = this.userSelected.concat(this.selectionNhanSus);
            if (listIdtemp.length > 0) {
                const newListIds = [...new Set(listIdtemp)];
                const newListItems = listItemtemp.filter(function (a) {
                    const key = a.nhanSuId;
                    if (!this[key]) {
                        this[key] = true;
                        return true;
                    }
                }, Object.create(null));
                this.itemNhanSuDropdownSelected = newListIds;
                this.userSelected = newListItems;
                this.onChange(newListIds);
                this.outputItems(this.userSelected);
            }
            this.close();
        }
    }

    selectedNhanSuSingle(dataItem) {
        this.openedUser = false;
        if (dataItem) {
            this.itemNhanSuDropdownSelected = dataItem.nhanSuId;
            this.userSelected = [dataItem];
            this.onChange(dataItem.nhanSuId);
            this.outputItems(this.userSelected);
        }
        this.close();
    }

    cancel() {
        this.openedUser = false;
        this.refresh();
        this.close();
    }

    refresh() {
        this.selectionIds = [];
        this.gridViewUser$ = null;
        this.gridState = {
            sort: [{ field: 'id', dir: 'desc' }],
            skip: 0,
            take: 20,
        };
    }

    close() {
        this.windowRef.close();
    }

    onkeyup(textSearch: string): void {
        this.parsedData = this.search(this.treeCoQuans, textSearch);
    }

    selectRow(e: SelectionEvent) {
        // kt list bo chon
        if (e.deselectedRows.length > 0) {
            const listBoChon = e.deselectedRows;
            listBoChon.map(x => {
                const index = this.selectionNhanSus.findIndex(y => x.dataItem.nhanSuId === y.nhanSuId);
                if (index > -1) {
                    this.selectionNhanSus.splice(index, 1);
                }
            });
        }
        // kt list chon
        if (e.selectedRows.length > 0) {
            const listChon = e.selectedRows;
            listChon.map(x => {
                this.selectionNhanSus.push(x.dataItem);
            });
        }
    }

    private setTreeValue(res) {
        const firstValue = res[0];
        if (firstValue) {
            this.expandKey = [firstValue.coQuanId];
            this.treeCoQuans = this.convertToTree(res, firstValue.capDonVi, 0);
            this.parsedData = [...this.treeCoQuans];

            // search
            this.itemCoQuanSelected = firstValue;
            this.loadItemNhanSuByCoQuan();
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

    private outputItems(data) {
        this.listItems.emit(data);
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortCol: this.gridState.sort[0].field,
            sortByASC: this.gridState.sort[0].dir === 'asc',
            coQuanId: this.itemCoQuanSelected.coQuanId,
            dotDanhGiaChiTietId: this.dotDanhGiaChiTietId ?? null,
            keyword: this.searchControl.value,
            manHinh: this.manHinh ?? null,
            idDoiTuongDanhGia: this.doiTuongDanhGiaControl.value,
        };
    }
}
