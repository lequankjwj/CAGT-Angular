import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { MenuQuery } from '@management-state/menu/menu.query';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { BaseUserComponent } from '../../_base/base-user.component';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { FormCreateAccountComponent } from '../../components/form-create-account/form-create-account.component';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DateUtil } from '@core/utils/date';
import { CustomTranslateService } from '@core/services/common';
import { TrangThaiKeHoachEnum } from '@themes/views/management/recruitment/_models/recruitment.enum';
import { IViTriViecLam } from '@themes/views/management/catalogs/_models/catalog.model';
import { State } from '@progress/kendo-data-query';

export interface IListCreateUser {
    idNhanSu: number;
    userName: string;
    hoDem: string;
    ten: string;
    tenDonVi: string;
    tenViTriViecLam: string;
    tenKeHoach: string;
}

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent extends BaseUserComponent<any> implements OnInit, OnDestroy {
    searchAdvance = false;
    openFirstTime = false;
    listKeHoachTuyenDung: any[] = [];
    listViTriViecLam: any[] = [];
    modelSearch = {
        keyword: '',
        idCoquan: null,
        tuNgay: null,
        denNgay: null,
        isCapTaiKhoan: null,
        idViTriViecLam: null,
        idKeHoachTuyenDung: null
    };

    gridState: State = {
        sort: [{ field: 'idNhanSu', dir: 'desc' }],
        skip: 0,
        take: 20,
    };

    pageHeight = window.innerHeight - ReziseTable - 60;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 60;
    }

    constructor(
        private apiService: ApiService,
        private windowService: WindowService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {
        super(menuQuery);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    disabledNgayKetThuc = (current: Date): boolean => {
        if (!this.modelSearch.tuNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearch.tuNgay)) < 0;
    };

    disabledNgayBatDau = (current: Date): boolean => {
        if (!this.modelSearch.denNgay) {
            return;
        }
        // Can not select days before today and today
        return differenceInCalendarDays(current, new Date(this.modelSearch.denNgay)) > 0;
    };

    openForm() { }

    onReset() {
        this.modelSearch = {
            keyword: '',
            idCoquan: null,
            tuNgay: null,
            denNgay: null,
            isCapTaiKhoan: null,
            idViTriViecLam: null,
            idKeHoachTuyenDung: null
        };
    }

    onExportExcel() { }

    onCreateAccount(dataItem) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.translate.get('USER.CREATE_ACCOUNT'),
            content: FormCreateAccountComponent,
            width: 550,
            top: 100,
            autoFocusedElement: 'body',
        });

        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = dataItem;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
            this.loadKeHoachTuyenDungBanDuyet();
            this.loadViTriViecLams();
        } else {
            el.classList.remove('search-overlay');
        }
    }

    get query() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            idCoquan: this.modelSearch.idCoquan ? parseInt(this.modelSearch.idCoquan, 10) : null,
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            isCapTaiKhoan: this.modelSearch.isCapTaiKhoan,
            idViTriViecLam: this.modelSearch.idViTriViecLam,
            idKeHoachTuyenDung: this.modelSearch.idKeHoachTuyenDung
        };
    }

    protected loadItems() {
        this.isLoading = true;

        // convert date
        if (this.modelSearch.tuNgay) {
            this.modelSearch.tuNgay = DateUtil.getFullDate(this.modelSearch.tuNgay);
        }
        if (this.modelSearch.denNgay) {
            this.modelSearch.denNgay = DateUtil.getFullDate(this.modelSearch.denNgay);
        }
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_NHAN_SU + '/NhanSuCapTaiKhoanVNU', this.query).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items as IListCreateUser[],
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

    private loadKeHoachTuyenDungBanDuyet() {
        this.apiService
            .read(UrlConstant.API.HRM_TD_KE_HOACH_TUYEN_DUNG + '/DanhMuc', {
                pageSize: 0,
                pageNumber: 0,
                idTrangThaiDuyet: TrangThaiKeHoachEnum.BAN_DUYET,
                IsFilterCoQuan: false
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items;
                this.listKeHoachTuyenDung = items.map(m => {
                    return {
                        id: m.id,
                        text: `${m.maKeHoach} - ${m.tenKeHoach}`,
                    };
                });
            });
    }

    private loadViTriViecLams() {
        this.apiService
            .read(`${UrlConstant.API.DM_VI_TRI_VIEC_LAM + '/List'}`, {
                pageSize: 0,
                pageNumber: 0,
                nhomViTriViecLamId: [],
            })
            .pipe(
                map(res => res.result),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                const items = res.items as IViTriViecLam[];
                this.listViTriViecLam = items.map(m => {
                    return {
                        id: m.viTriViecLamId,
                        text: m.ten,
                    };
                });
            });
    }
}
