import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppConfig } from '@core/config/app.config';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewFileComponent } from '@shared/controls/view-file/view-file.component';
import { AppConstant, FOLDER } from '@core/constants/app.constant';
import { CustomTranslateService } from '@core/services/common';

export interface IFileInfo {
    name: string;
    type: number;
    size: number;
    path: string;
}

@Component({
    selector: 'c-upload',
    templateUrl: './c-upload.component.html',
    styleUrls: ['./c-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CUploadComponent),
        },
    ],
})
export class CUploadComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() file?: NzUploadFile[] = [];
    @Input() typeOfFile?: string;
    @Input() multiple = true;
    @Input() placeholder = 'Đính kèm';
    @Input() isDisabled = false;
    @Input() folderName?: string;
    @Input() fileSize?: number;
    @Output() fileInput = new EventEmitter<any>();

    uploading = false;
    fileList: NzUploadFile[] = [];

    value: IFileInfo[] = [];

    uploadUrl: string;

    previewImage: string | undefined = '';
    previewVisible = false;

    private config = AppConfig.settings;
    constructor(private translate: CustomTranslateService, private modal: NzModalService, private viewContainerRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        const aFile = changes.file.currentValue;
        if ((aFile && aFile.length < 1) || aFile == null) {
            this.fileList = [];
        }

        if (this.file && this.file.length > 0) {
            this.fileList = this.fileList.concat(this.file);
            this.fileList.map((item, idx) => {
                item.uid = idx.toString();
            });
        } else {
            this.fileList = [];
        }
    }

    ngOnInit() {
        const params = {
            FolderFunction: this.folderName ?? FOLDER.FOLDER_FUNCTION,
            FileSize: 0,
        };

        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        this.uploadUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/HRM/Medias/UploadFile?${qs}`;
    }

    onChange(value) {}

    onTouched() {}

    writeValue(value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    changeFile({ file, fileList }: NzUploadChangeParam) {
        const status = file.status;
        switch (status) {
            case 'done':
                if (this.multiple) {
                    if (fileList && fileList.length > 0) {
                        const fileOutput = this.fileList.map(item => {
                            if (item.response && item.response.result) {
                                return {
                                    fileId: item.response.result?.files[0].fileId,
                                    name: item.response.result?.files[0].name,
                                    type: 0,
                                    size: 0,
                                    path: item.response.result?.files[0].path,
                                    isDelete: false,
                                };
                            } else {
                                return {
                                    fileId: item.fileDinhKemId,
                                    name: item.name,
                                    type: 0,
                                    size: 0,
                                    path: item.path,
                                    isDelete: false,
                                    guidId: item.guidId,
                                };
                            }
                        });
                        this.fileInput.emit(fileOutput);
                        return;
                    }
                } else {
                    if (fileList.length > 1) {
                        this.fileList.splice(0, 1);
                    }
                    const fileOutput = this.fileList.map(item => {
                        if (item.response && item.response.result) {
                            return {
                                fileId: item.response.result?.files[0].fileId,
                                name: item.response.result?.files[0].name,
                                type: 0,
                                size: 0,
                                path: item.response.result?.files[0].path,
                                isDelete: false,
                            };
                        } else {
                            return {
                                fileId: item.fileDinhKemId,
                                name: item.name,
                                type: 0,
                                size: 0,
                                path: item.path,
                                isDelete: false,
                                guidId: item.guidId,
                            };
                        }
                    });
                    this.fileInput.emit(fileOutput);
                }

                break;
            case 'removed':
                const output = this.fileList
                    .filter(m => m.uid !== file.uid)
                    .map(item => {
                        return {
                            fileId: item.fileDinhKemId,
                            name: item.name,
                            type: 0,
                            size: 0,
                            path: item.path,
                            guidId: item.guidId,
                        };
                    });
                this.fileInput.emit(output);
                break;
        }
    }

    handlePreview = async (file: NzUploadFile) => {
        if (file && file.guidId) {
            this.modal.create({
                nzTitle: this.translate.get('LB.VIEW_FILE'),
                nzContent: ViewFileComponent,
                nzViewContainerRef: this.viewContainerRef,
                nzWidth: 1100,
                nzWrapClassName: 'vertical-center-modal',
                nzGetContainer: () => document.body,
                nzComponentParams: {
                    key: file.guidId,
                    fileName: file.name,
                },
                nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
                nzFooter: null,
            });
        }
    };
}
