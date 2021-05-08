import { WindowRef } from '@progress/kendo-angular-dialog';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { INhanSu, INhanSuCoQuan, INhanSuCoQuanChucVu } from '@themes/views/management/human-resource/_models/human-resource.model';
import { UrlConstant } from '@core/constants/url.constant';
import { GridDataResult } from '@progress/kendo-angular-grid';
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

@Component({
    selector: 'widget-select-user-single',
    templateUrl: './select-user-single.component.html',
    styleUrls: ['./select-user-single.component.scss'],
})
export class SelectUserSingleComponent implements OnInit, OnDestroy {
    @Input() dataSelected: any;
    @Input() dotDanhGiaChiTietId: number; // (optional) search nhan su theo doi tuong trong DotDanhGia, chi lay nhung NS chua duoc chon trong dotDanhGiaChiTietId cua DotDanhGia
    @Input() message: string | 'Để chọn người dùng bạn vui lòng bấm nút';
    @Input() manHinh?: number;
    @Output() userOutput = new EventEmitter<any>();

    nhanSus: INhanSu[];
    nhanSuCoQuanChucVus: INhanSuCoQuanChucVu[];
    nhanSuCoQuans: INhanSuCoQuan[];

    treeCoQuans: ITreeCoQuan[];
    parsedData: ITreeCoQuan[];

    gridViewUser$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 10,
    };
    pageConfig = PageConfig;
    selectionIds: any[] = [];
    itemCoQuanSelected: ICoQuan;
    searchValue = '';
    searchControl = new FormControl();
    doiTuongDanhGiaControl = new FormControl();

    dropdownListEnum = DropDownListEnum;

    expandKey = [];

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private departmentService: DepartmentService,
        private nhanSuService: NhanSuService,
        private window: WindowRef
    ) {}

    ngOnInit() {
        this.loadTreeCoQuan();
        // this.loadNhanSus();
        this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.gridState.skip = 0;
            this.loadItemNhanSuByCoQuan();
        });

        this.doiTuongDanhGiaControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.gridState.skip = 0;
            this.loadItemNhanSuByCoQuan();
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
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
            .getNhanSuByCoQuan(0, 0, this.manHinh)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => (this.nhanSuCoQuanChucVus = res));
    }

    loadTreeCoQuan() {
        this.departmentService
            .getDepartments(this.manHinh)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => this.setTreeValue(res));
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

    refesh() {
        this.selectionIds = [];
        this.gridViewUser$ = null;
        this.gridState = {
            sort: [],
            skip: 0,
            take: 20,
        };
    }

    onkeyup(textSearch: string): void {
        this.parsedData = this.search(this.treeCoQuans, textSearch);
    }

    search(items: any[], textSearch: string): any[] {
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

    contains(text: string, term: string): boolean {
        return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }

    selectedNhanSu(dataItem) {
        this.userOutput.emit(dataItem);
        this.window.close(dataItem);
        this.refesh();
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
