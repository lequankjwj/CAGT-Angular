import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IFile, IFileAttach } from '@core/models/common/file.model';
import { ISettingBieuMau } from '@core/models/setting/report-sample.model';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NotificationService } from '@core/services/common/notification.service';
import { UtilService } from '@core/services/common/util.service';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-report-sample',
    templateUrl: './form-report-sample.component.html',
    styleUrls: ['./form-report-sample.component.scss'],
})
export class FormReportSampleComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: ISettingBieuMau;

    form: FormGroup;
    dropdownListEnum = DropDownListEnum;
    fileInput: IFileAttach[] = [];

    fileList: FileList;

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private window: WindowRef
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [0],
            isExportPDF: this.model.isExportPDF,
            ghiChu: [''],
        });

        if (this.action === ActionEnum.UPDATE) {
            this.form.patchValue(this.model);
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        if (this.model.tenFile === '' && ((this.fileList && this.fileList.length < 1) || !this.fileList)) {
            // trigger validate all field
            this.notification.showWarningMessage('Chưa chọn biểu mẫu !');
            return;
        }
        const formData = new FormData();
        formData.append('id', this.model.id.toString());
        if (this.fileList && this.fileList.length > 0) {
            formData.append('fileDinhKem', this.fileList[0]);
        }
        formData.append('ghiChu', this.form.get('ghiChu').value);
        formData.append('isExportPDF', this.form.get('isExportPDF').value);
        this.apiService
            .put(UrlConstant.API.HRM_SETTING_BIEU_MAU, formData)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                // show notification
                this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                // close form
                this.closeForm();
            });
    }

    closeForm() {
        this.window.close();
    }

    selectFile(file: FileList) {
        this.fileList = file;
    }

    removeFile() {
        this.fileList = null;
        this.model.tenFile = this.model.loaiFile = '';
    }
}
