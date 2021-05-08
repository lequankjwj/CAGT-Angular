import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '@core/data-services/api.service';
import { UrlConstant } from '@core/constants/url.constant';
import { NotificationService } from '@core/services/common/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComparePasswordValidator } from '@core/helpers/validator.helper';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UtilService } from '@core/services/common/util.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
    @Input() listUserName: Array<string>;

    form: FormGroup;

    private destroyed$ = new Subject();
    constructor(
        private apiService: ApiService,
        private notification: NotificationService,
        private formBuilder: FormBuilder,
        private modal: NzModalRef,
        private util: UtilService
    ) {
        this.form = this.formBuilder.group(
            {
                newPassword: ['', Validators.required],
                confirmNewPassword: ['', Validators.required],
            },
            {
                validator: ComparePasswordValidator('newPassword', 'confirmNewPassword'),
            }
        );
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    updatePassword() {
        if (this.form.invalid) {
            this.util.validateAllFormFields(this.form);
            return;
        } else {
            const body = {
                users: this.listUserName.map(m => {
                    return {
                        username: m,
                        password: this.form.get('newPassword').value,
                    };
                }),
            };
            const updatePassword$ = this.apiService
                .put(UrlConstant.API.ACL_USER + '/AdminChangePassword', body)
                .pipe(takeUntil(this.destroyed$));
            updatePassword$.subscribe(() => {
                this.notification.showSuccessMessage('Cập nhật mật khẩu thành công !');
                this.closeModal();
            });
        }
    }

    closeModal() {
        this.modal.close();
    }
}
