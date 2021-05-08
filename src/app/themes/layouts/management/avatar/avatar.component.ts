import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { NotificationService } from '@core/services/common/notification.service';
import { forkJoin, Observable, Observer, Subject, Subscription } from 'rxjs';
import { AppConfig } from '@core/config/app.config';
import { EmitEvent, EventBus, EventBusService } from '@core/services/common/event-bus.service';

import { IUserInfo } from '@core/auth/user-token.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FOLDER } from '@core/constants/app.constant';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageUtil } from '@core/utils/localstorage';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit, OnDestroy {
    loading = false;
    avatarUrl?: string;
    user: IUserInfo;
    avatarUrlFromResponse: string;
    idFile: number;
    eventbusSub: Subscription;

    modelEvent = {
        avatarUrlFromResponse: '',
        trangThai: true,
        isCaNhan: false
    };
    apiUrl: string;

    private config = AppConfig.settings;
    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private eventbus: EventBusService,
        private modal: NzModalService,
        private translate: CustomTranslateService
    ) {}

    ngOnInit(): void {
        this.apiUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/HRM/Medias/UploadFile?FolderFunction=${FOLDER.HINH_DAI_DIEN}&FileSize=0`;
        if (LocalStorageUtil.getAvatar()) {
            this.avatarUrl = this.config.resourceUrl + LocalStorageUtil.getAvatar();
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    updateAvatarOfUser() {
        const updateAvatarUser$ = this.apiService.put('' + '/UpdateUserAvatar', {
            avatar: this.avatarUrlFromResponse,
        });
        const updateAvatarHRM$ = this.apiService.put('' + '/CapNhatAvatar', {
            idHinhNhanSu: this.idFile,
        });
        forkJoin([updateAvatarUser$, updateAvatarHRM$])
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                this.notification.showSuccessMessage('Cập nhật hình ảnh thành công');
                if (this.avatarUrlFromResponse) {
                    // Local Strogare
                    LocalStorageUtil.setAvatar(this.avatarUrlFromResponse);

                    // Event Bus
                    this.modelEvent = {
                        avatarUrlFromResponse: this.avatarUrlFromResponse,
                        trangThai: true,
                        isCaNhan: true
                    };
                }
                // Cập nhật lại hình ảnh trên view
                this.eventbus.emit(new EmitEvent(EventBus.UpdateAvatarEnum, this.modelEvent));

                // close modal
                this.modal.closeAll();
            });
    }

    beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]) => {
        return new Observable((observer: Observer<boolean>) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.notification.showWarningMessage('You can only upload JPG file!');
                observer.complete();
                return;
            }
            const isLt2M = file.size! / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.notification.showWarningMessage('Image must smaller than 2MB!');
                observer.complete();
                return;
            }

            observer.next(isJpgOrPng && isLt2M);
            observer.complete();
        });
    };

    handleChange(info: { file: NzUploadFile }): void {
        switch (info.file.status) {
            case 'uploading':
                this.loading = true;
                break;
            case 'done':
                // Get this url from response in real world.
                // tslint:disable-next-line:no-non-null-assertion
                this.getBase64(info.file!.originFileObj!, (img: string) => {
                    this.loading = false;
                    this.avatarUrl = img;
                });

                if (info.file.response) {
                    this.avatarUrlFromResponse = info.file.response?.result?.files[0]?.path;
                    this.idFile = info.file.response?.result?.files[0].fileId;
                }

                break;
            case 'error':
                this.loading = false;
                break;
        }
    }

    private getBase64(img: File, callback: (img: string) => void): void {
        const reader = new FileReader();
        // tslint:disable-next-line:no-non-null-assertion
        reader.addEventListener('load', () => callback(reader.result!.toString()));
        reader.readAsDataURL(img);
    }
}
