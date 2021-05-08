import {Component, OnDestroy, OnInit} from '@angular/core';
import {UrlConstant} from '@core/constants/url.constant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComparePasswordValidator} from '@core/helpers/validator.helper';
import {ApiService} from '@core/data-services/api.service';
import {NotificationService} from '@core/services/common/notification.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {FormUtil} from '@core/utils/form';
import {Subject} from 'rxjs/internal/Subject';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    formChangePassword: FormGroup;

    private destroyed$ = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notification: NotificationService,
        private modal: NzModalRef
    ) {
    }

    ngOnInit(): void {
        this.formChangePassword = this.formBuilder.group(
            {
                oldPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                confirmNewPassword: ['', Validators.required],
            },
            {
                validator: ComparePasswordValidator('newPassword', 'confirmNewPassword'),
            }
        );
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onChangePassword() {
        if (this.formChangePassword.invalid) {
            FormUtil.validateAllFormFields(this.formChangePassword);
            return;
        } else {
            this.apiService
                .put('' + '/UpdateUserPassword', this.formChangePassword.value)
                .pipe(
                    takeUntil(this.destroyed$)
                )
                .subscribe(res => {
                    this.notification.showSuccessMessage('Cập nhật mật khẩu thành công !');
                    this.removeAllAccoutBySystem();
                    this.closeModal();
                });
        }
    }

    removeAllAccoutBySystem() {
        this.apiService
            .read('', {
                pageNumber: 0,
                pageSize: 0,
            })
            .pipe(
                map(userDevices => {
                    if (userDevices && userDevices.result && userDevices.result.items) {
                        return userDevices.result.items.map(x => x.deviceHash);
                    }
                }),
                switchMap(userDevices =>
                    this.apiService.post(UrlConstant.API.ACL_ACCOUNT + '/Logout', {
                        deviceHash: userDevices,
                        isCurrentUserLogout: false,
                    })
                )
            )
            .subscribe(res => {
            });
    }

    closeModal() {
        this.modal.destroy();
    }
}
