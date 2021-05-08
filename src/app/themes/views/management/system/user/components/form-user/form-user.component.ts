import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { MessageConstant } from '@core/constants/message.constant';
import { CustomEmailValidator, NumberValidator } from '@core/helpers/validator.helper';
import { UrlConstant } from '@core/constants/url.constant';
import { IUser } from '@core/models/users/users.model';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';
import { BaseUserFormComponent } from '@themes/views/management/system/user/_base/base-user-form.component';

@Component({
    selector: 'app-form-user',
    templateUrl: './form-user.component.html',
    styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent extends BaseUserFormComponent<IUser> implements OnInit, OnDestroy {
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService,
        protected windowRef: WindowRef
    ) {
        super(windowRef);
    }

    ngOnInit() {
        super.ngOnInit();

        // set form value
        if (this.model) {
            this.form.get('userId').setValue(this.model.id);
            // remove some control
            this.form.removeControl('userName');
            this.form.removeControl('password');
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    createForm() {
        this.form = this.formBuilder.group({
            userId: [0],
            parentId: [null, Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: [''],
            email: ['', CustomEmailValidator],
            mobileNumber: ['', [NumberValidator]],
            phoneNumber: [''],
            userName: ['', Validators.required],
            password: ['', Validators.required],
            isActive: [true],
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            // trigger validate all field
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            switch (this.action) {
                case ActionEnum.CREATE:
                    const createUser$ = this.apiService.post(UrlConstant.API.ACL_USER, this.form.value).pipe(takeUntil(this.destroyed$));
                    createUser$.subscribe(() => {
                        // show notification
                        this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                        // close form
                        this.closeForm();
                    });
                    break;
                case ActionEnum.UPDATE:
                    const updateUser$ = this.apiService.put(UrlConstant.API.ACL_USER, this.form.value).pipe(takeUntil(this.destroyed$));
                    updateUser$.subscribe(() => {
                        // show notification
                        this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                        // close form
                        this.closeForm();
                    });
                    break;
            }
        }
    }
}
