import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GridDataResult, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { ApiService } from '@core/data-services/api.service';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { PageConfig, ReziseTable } from '@core/constants/app.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { TrangThaiDongBoNhanSuDescription, TrangThaiDongBoNhanSuEnum } from '@core/models/common/user.enum';
import { NotificationService } from '@core/services/common/notification.service';
import { AppMessageConfig } from '@core/config/app.config.message';
import { MessageConstant } from '@core/constants/message.constant';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { MenuQuery } from '@management-state/menu/menu.query';

export const defaultPassword = '1111';
@Component({
    selector: 'app-sync-user',
    templateUrl: './sync-user.component.html',
    styleUrls: ['./sync-user.component.scss'],
})
export class SyncUserComponent implements OnInit, OnDestroy {
    gridViewNhanSu: GridDataResult;
    isLoading = false;
    gridState: State = {
        sort: [{ field: 'id', dir: 'desc' }],
        skip: 0,
        take: 20,
    };
    selectionIds = [];
    pageConfig = PageConfig;
    dropdownListEnum = DropDownListEnum;
    trangThaiDongBoNhanSus = [TrangThaiDongBoNhanSuEnum.CHUA_DONG_BO, TrangThaiDongBoNhanSuEnum.DA_DONG_BO];
    trangThaiDongBoNhanSuDisplay = TrangThaiDongBoNhanSuDescription;

    opened = false;
    modelSearch = {
        keyword: '',
        maNhanSu: null,
        hoTen: null,
        soDienThoai: null,
        loaiNhanSuId: null,
        loaiHopDongId: null,
        trangThaiNhanSuId: null,
        chucVuId: null,
        chucDanhId: null,
        ngachId: null,
        quocTichId: null,
        danTocId: null,
        tonGiaoId: null,
        coQuanId: null,
        trangThaiDongBo: null,
    };

    userSelecteds = [];
    groupSelectedId: number;
    selectAllState: SelectAllCheckboxState = 'unchecked';

    tabName: string;

    private destroyed$ = new Subject();
    pageHeight = window.innerHeight - ReziseTable - 140;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.pageHeight = event.target.innerHeight - ReziseTable - 140;
    }
    constructor(private apiService: ApiService, private notification: NotificationService, private menuQuery: MenuQuery) {}

    ngOnInit(): void {
        this.tabName = this.menuQuery.getTitleWithCurrentUrl();
        this.loadItemNhansus();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * State change with fields: take, skip, sort
     * @param state
     */
    onStateChange(state: State) {
        this.gridState = state;
        this.loadItemNhansus();
    }

    sortChange(sort: SortDescriptor[]): void {
        this.gridState.sort = sort;
        this.loadItemNhansus();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItemNhansus();
    }

    onSelectAllChange(checkedState: SelectAllCheckboxState) {
        const ids = this.gridViewNhanSu.data.map(m => m.idNhanSu);
        if (checkedState === 'checked') {
            const nhanSuIds = this.userSelecteds.map(x => x.nhanSuId);
            ids.map(m => {
                if (!nhanSuIds.includes(m)) {
                    const user = this.gridViewNhanSu.data.find(x => x.idNhanSu === m);
                    this.userSelecteds.push({
                        nhanSuId: user.idNhanSu,
                        firstName: user.hoDem,
                        lastName: user.ten,
                        address: '',
                        parentId: 0,
                        email: user.emailNoiBo,
                        mobileNumber: user.soDienThoai,
                        phoneNumber: '',
                        userName: user.userName,
                        maNhanSu: user.maNhanSu,
                        password: defaultPassword,
                        isActive: true,
                    });
                }
            });
            this.selectAllState = 'checked';
        } else {
            const nhanSuIds = this.userSelecteds.map(x => x.nhanSuId);
            ids.map(m => {
                if (nhanSuIds.includes(m)) {
                    const findIdx = this.userSelecteds.findIndex(x => x.nhanSuId === m);
                    if (findIdx > -1) {
                        this.userSelecteds.splice(findIdx, 1);
                    }
                }
            });
            this.selectAllState = 'unchecked';
        }
    }

    onSelectedUser(dataItem, $event) {
        if ($event.target.checked) {
            this.userSelecteds.push({
                nhanSuId: dataItem.idNhanSu,
                firstName: dataItem.hoDem,
                lastName: dataItem.ten,
                address: '',
                parentId: 0,
                email: dataItem.emailNoiBo,
                mobileNumber: dataItem.soDienThoai,
                phoneNumber: '',
                userName: dataItem.userName,
                maNhanSu: dataItem.maNhanSu,
                password: defaultPassword,
                isActive: true,
            });
        } else {
            const findIdx = this.userSelecteds.findIndex(m => m.nhanSuId === dataItem.idNhanSu);
            if (findIdx > -1) {
                this.userSelecteds.splice(findIdx, 1);
            }
        }
    }

    onSyncUserFromNhanSu() {
        if (this.groupSelectedId) {
            this.userSelecteds.map(m => (m.parentId = this.groupSelectedId));
            const body = {
                users: this.userSelecteds,
            };
            const userSelecteds$ = this.apiService
                .put(UrlConstant.API.ACL_USER + '/SyncUserFromNhanSu', body)
                .pipe(takeUntil(this.destroyed$));
            userSelecteds$.subscribe(res => {
                // set null
                this.selectionIds = [];
                this.userSelecteds = [];
                if (res.errorMessages.length === 0) {
                    this.notification.showSuccessMessage('Đồng bộ thông tin nhân sự thành công !');
                } else {
                    const messages = res.errorMessages
                        .map(x => {
                            return this.getMessageToJson(x.errorCode);
                        })
                        .join('<br/>');
                    this.notification.showErrorMessage(messages);
                }
            });
        } else {
            this.notification.showErrorMessage('Chưa chọn nhóm đồng bộ !');
        }
    }

    private loadItemNhansus() {
        this.isLoading = true;
        this.apiService
            .read(UrlConstant.API.HRM_NHAN_SU, this.queryOptions)
            .pipe(
                map(res => {
                    if (res.result) {
                        return {
                            data: res.result.items,
                            total: res.result.pagingInfo?.totalItems,
                        };
                    } else {
                        return {
                            data: [],
                            total: 0,
                        };
                    }
                }),
                finalize(() => (this.isLoading = false)),
                takeUntil(this.destroyed$)
            )
            .subscribe(res => {
                this.gridViewNhanSu = res;
            });
    }

    private get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize: this.gridState.take,
            sortName: this.gridState.sort[0].field,
            sortASC: this.gridState.sort[0].dir === 'asc',
            keySearch: this.modelSearch.keyword,
            idsCoQuan: this.modelSearch.coQuanId,
            maNhanSu: this.modelSearch.maNhanSu,
            hoTen: this.modelSearch.hoTen,
            soDienThoai: this.modelSearch.soDienThoai,
            idsLoaiHopDong: this.modelSearch.loaiHopDongId,
            idsTrangThaiNhanSu: this.modelSearch.trangThaiNhanSuId,
            idsChucVu: this.modelSearch.chucVuId,
            idsChucDanh: this.modelSearch.chucDanhId,
            idsQuocTich: this.modelSearch.quocTichId,
            idsNgach: this.modelSearch.ngachId,
            idsTonGiao: this.modelSearch.tonGiaoId,
            idsDanToc: this.modelSearch.danTocId,
            idsLoaiNhanSu: this.modelSearch.loaiNhanSuId,

            isGiangVien: null,
            isNghienCuuVien: null,
            isThamGiaNVCL: null,
            isThamGiaGiangDayCL: null,
            isThamGiaQuanLyCL: null,
            isQuanLyCSVC: null,
            isQuanLySach: null,
            idTrangThaiDuLieu: null,
            isDongBo:
                this.modelSearch.trangThaiDongBo != null ? this.modelSearch.trangThaiDongBo === TrangThaiDongBoNhanSuEnum.DA_DONG_BO : null,
        };
    }

    private getMessageToJson(key: string): string {
        const message = AppMessageConfig.settings[key];
        if (!message) {
            return MessageConstant.COMMON.MSG_ERROR_CODE_NOTFOUND;
        }
        return message;
    }
}
