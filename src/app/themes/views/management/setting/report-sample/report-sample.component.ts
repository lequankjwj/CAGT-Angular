import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDeleteConfig, PageConfig, ReziseTable } from '@core/constants/app.constant';
import { ActionEnum, FileExtensionEnum } from '@core/constants/enum.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { ISettingBieuMau } from '@core/models/setting/report-sample.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { FileService } from '@core/services/common/file.service';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject } from 'rxjs';
import { debounceTime, finalize, map, takeUntil } from 'rxjs/operators';
import { FormReportSampleComponent } from './form-report-sample/form-report-sample.component';
import { ReportUtil } from '@core/utils/report';

@Component({
    selector: 'app-report-sample',
    templateUrl: './report-sample.component.html',
    styleUrls: ['./report-sample.component.scss'],
})
export class ReportSampleComponent implements OnInit, OnDestroy {
    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 100,
        group: [{ field: 'groupName' }],
    };

    pageConfig: PagerSettings | boolean = PageConfig;
    loading = false;
    selectionIds: number[] = [];

    searchControl = new FormControl();

    pageHeight = window.innerHeight - ReziseTable + 32;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable + 32;
    }

    private action: ActionEnum;
    private model: ISettingBieuMau;
    private destroyed$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private windowService: WindowService,
        private modal: NzModalService,
        private notificationService: NotificationService,
        private translate: CustomTranslateService,
        private fileService: FileService,
        private util: UtilService
    ) {}

    ngOnInit() {
        this.loadItems();
        this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.loadItems();
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    showModalViewFile(guidId, name) {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Xem tập tin Đính kèm',
            content: ViewFileComponent,
            width: 1200,
            height: 800,
            top: 10,
            autoFocusedElement: 'body',
            state: 'maximized',
        });

        const param = windowRef.content.instance;
        param.key = guidId;
        param.fileName = name;

        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
            }
        });
    }

    addHandler() {
        this.model = undefined;
        this.action = ActionEnum.CREATE;
        this.openForm();
    }

    editHandler(dataItem) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.openForm();
    }

    downLoadHandler(dataItem) {
        // hardcode
        if (dataItem.loaiFile == 1) {
            dataItem.loaiFile = '.xls';
        }
        this.fileService
            .downloadFile(UrlConstant.API.HRM_SETTING_BIEU_MAU + '/Download', {
                maBieuMau: dataItem.maBieuMau,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.fileService.convertResourceToBlob(
                    res.body,
                    FileExtensionEnum.XLXS,
                    `${dataItem.maBieuMau}_${ReportUtil.generateExtensionReport()}${dataItem.loaiFile}`
                );
            });
    }

    openForm() {
        this.opened = true;
        const windowRef = this.windowService.open({
            title: 'Cập nhật',
            content: FormReportSampleComponent,
            width: 650,
            top: 100,
            autoFocusedElement: 'body',
        });
        const param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        windowRef.result.subscribe(result => {
            if (result instanceof WindowCloseResult) {
                this.opened = false;
                this.loadItems();
            }
        });
    }

    removeHandler(dataItem: ISettingBieuMau) {
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
                    const remove$ = this.apiService.delete(UrlConstant.API.HRM_SETTING_BIEU_MAU, body).pipe(takeUntil(this.destroyed$));
                    remove$.subscribe(() => {
                        // reset
                        this.selectionIds = [];

                        // show notification
                        this.notificationService.showSuccessMessage(this.translate.get('MES.DELETE_DONE'));
                        // set current page
                        this.gridState.skip = 0;
                        // reload data
                        this.loadItems();
                    });
                },
                nzCancelText: ModalDeleteConfig.no,
                nzOnCancel: () => {},
            });
        }
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    isExportPdfChange(dataItem) {
        const formData = new FormData();
        formData.append('id', dataItem.id.toString());
        formData.append('isExportPDF', (!dataItem.isExportPDF).toString());
        const value = dataItem.isExportPDF;
        this.apiService
            .put(UrlConstant.API.HRM_SETTING_BIEU_MAU, formData)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(
                () => {
                    dataItem.isExportPDF = !value;
                },
                err => {
                    // rollback
                    dataItem.isExportPDF = value;
                }
            );
    }

    private loadItems() {
        this.loading = true;
        this.gridView$ = this.apiService.read(UrlConstant.API.HRM_SETTING_BIEU_MAU + '/List', this.queryOptions).pipe(
            map((res: IResponseData<IPagedResult<any>>) => {
                if (res.result && res.result.items) {
                    return process(res.result.items, this.gridState);
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
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keyword: this.searchControl.value,
        };
    }
}
