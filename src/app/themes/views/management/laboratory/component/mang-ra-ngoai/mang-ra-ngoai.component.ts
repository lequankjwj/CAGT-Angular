import { HostListener, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { CustomTranslateService, NotificationService } from '@core/services/common';
import { MenuQuery } from '@management-state/menu/menu.query';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';
import { DropDownListEnum } from '@shared/containers/c-select';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ETrangThaiMangRaNgoai } from '../../_models/ptn.enum';
import { IMangRaNgoai } from '../../_models/ptn.model';
import { FormDuyetMangRaNgoaiComponent } from './form-duyet-mang-ra-ngoai/form-duyet-mang-ra-ngoai.component';
import { FormMangRaNgoaiComponent } from './form-mang-ra-ngoai/form-mang-ra-ngoai.component';

@Component({
    selector: 'app-mang-ra-ngoai',
    templateUrl: './mang-ra-ngoai.component.html',
    styleUrls: ['./mang-ra-ngoai.component.scss'],
})
export class MangRaNgoaiComponent implements OnInit {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    @Input() idThietBi: number;
    @Input() isMain: boolean;
    @Input() isQuanLy: boolean;

    private destroyed$ = new Subject();
    gridView$: Observable<GridDataResult>;
    private model: IMangRaNgoai;
    protected action: ActionEnum;
    title: string;
    isLoading = false;
    searchAdvance = false;
    openFirstTime = false;
    dropdownListEnum = DropDownListEnum;
    chonNhanSu: number[] = [];
    opened = false;
    selectionIds: number[] = [];
    tabName: string;
    trangThaiMangRaNgoaiEnum = ETrangThaiMangRaNgoai;
    pageConfig: PagerSettings | boolean = false;
    gridState: State = {
        sort: [
            {
                field: 'id',
                dir: 'desc',
            },
        ],
        skip: 0,
        take: 10,
    };

    public modelSearch = {
        keyword: '',
        permissionType: null,
        idsNhanSu: null,
        trangThaiDuyet: null,
        idsThietBi: [],
        tuNgay: null,
        denNgay: null,
    };

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    constructor(
        private apiService: ApiService,
        private notificationService: NotificationService,
        protected windowService: WindowService,
        private modal: NzModalService,
        private translate: CustomTranslateService,
        protected menuQuery: MenuQuery
    ) {}

    ngOnInit() {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        if(this.idThietBi && this.idThietBi != undefined && this.idThietBi > 0) {
            this.modelSearch.idsThietBi.push(this.idThietBi);
        }
        /*
            0 - Cá nhân
            1 - Quản lý
            2 - Hết
         */
        this.modelSearch.permissionType = 0;
        if (this.isMain === true) {
            if (this.isQuanLy === true) {
                this.modelSearch.permissionType = 1;
            }
        } else {
            this.modelSearch.permissionType = 2;
        }

        this.loadItems();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private loadItems() {

        this.isLoading = true;
        this.gridView$ = this.apiService.post(UrlConstant.API.MANG_RA_NGOAI + '/GetDanhSachTB_MangRaNgoai', this.queryOptions, true).pipe(
            map(res => {
                if (res.result && res.result.items) {
                    return {
                        data: res.result.items,
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
            finalize(() => (this.isLoading = false))
        );
    }

    private get queryOptions() {
        return {
            pageSize: this.gridState.take,
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.modelSearch.keyword,
            idsThietBi: this.modelSearch.idsThietBi != null ?  this.modelSearch.idsThietBi.join(',') : '',
            permissionType: this.modelSearch.permissionType,
            tuNgay: this.modelSearch.tuNgay,
            denNgay: this.modelSearch.denNgay,
            idsNhanSu: this.modelSearch.idsNhanSu,
            trangThaiDuyet: this.modelSearch.trangThaiDuyet,
        };
    }

    refreshHandler() {
        this.chonNhanSu = [];
        this.modelSearch = {
            keyword: '',
            permissionType: null,
            idsNhanSu: null,
            trangThaiDuyet: null,
            idsThietBi: [],
            tuNgay: null,
            denNgay: null,
        };
    }

    searchHandler() {
        this.gridState.skip = 0;
        this.chonNhanSu.length > 0 ? (this.modelSearch.idsNhanSu = this.chonNhanSu.toString()) : (this.modelSearch.idsNhanSu = null);
        this.loadItems();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    openAdvanceSearch() {
        this.openFirstTime = true;
        const el = document.querySelector('.search-backdrop');
        this.searchAdvance = !this.searchAdvance;
        if (this.searchAdvance) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if ((element.nodeName === 'TD' || element.nodeName === 'TH') && element.offsetWidth < element.scrollWidth) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }

    addHandler(flag: boolean) {
        this.model = undefined;
        this.title = this.translate.get('PTN.TITLE.C_MANG_RA_NGOAI');
        this.action = ActionEnum.CREATE;
        this.openForm(flag);
    }

    editHandler(dataItem, flag: boolean) {
        this.model = dataItem;
        this.title = this.translate.get('PTN.TITLE.M_MANG_RA_NGOAI');
        this.action = ActionEnum.UPDATE;
        this.openForm(flag);
    }

    openForm(flag: boolean) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: this.title,
            content: FormMangRaNgoaiComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        param.idThietBi = this.idThietBi;
        param.isMain = this.isMain;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }

    removeSelectedHandler() {
        if (this.selectionIds.length > 0) {
            const body = {
                ids: this.selectionIds,
            };
            this.modal.confirm({
                nzTitle: ModalDeleteConfig.title,
                nzContent: ModalDeleteConfig.content,
                nzOkText: ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: () => {
                    const remove$ = this.apiService.delete(UrlConstant.API.MANG_RA_NGOAI, body).pipe(takeUntil(this.destroyed$));
                    remove$.subscribe(() => {
                        this.selectionIds = [];
                        this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_DELETE_DONE);
                        this.gridState.skip = 0;
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    onDuyetKhongDuyet() {
        if (this.selectionIds.length > 0) {
            this.title = this.translate.get('PTN.TITLE.A_MANG_RA_NGOAI');
            this.opened = true;
            const windowRef = this.windowService.open({
                title: this.title,
                content: FormDuyetMangRaNgoaiComponent,
                width: 600,
                top: 10,
                autoFocusedElement: 'body',
            });
            const param = windowRef.content.instance;
            param.action = this.action;
            param.model = this.model;
            param.ids = this.selectionIds;
            //param.idTrangThai = flag;

            windowRef.result.subscribe(result => {
                if (result instanceof WindowCloseResult) {
                    this.opened = false;
                    this.loadItems();
                }
            });
        }
    }

    changeNhanSu(data) {
        this.chonNhanSu = data.map(x => {
            return x.nhanSuId;
        });
    }
}
