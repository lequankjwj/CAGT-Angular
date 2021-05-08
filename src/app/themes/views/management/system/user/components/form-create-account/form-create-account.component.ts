import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DropDownListEnum } from '@shared/containers/asc-select';
import { FormUtil } from '@core/utils/form';

@Component({
    selector: 'app-form-create-account',
    templateUrl: './form-create-account.component.html',
    styleUrls: ['./form-create-account.component.scss'],
})
export class FormCreateAccountComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: any;

    form: FormGroup;
    dropdownListEnum = DropDownListEnum;

    private destroyed$ = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            doiTuongId: [null],
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: [''],
            lastName: [''],
            parentId: [null, Validators.required],
        });

        if (this.model) {
            this.form.patchValue({
                doiTuongId: this.model.idNhanSu,
                firstName: this.model.ten,
                lastName: this.model.hoDem,
            });
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }
        if (this.form.valid) {
            const updateUser$ = this.apiService
                .post(UrlConstant.API.SYSTEM.USERS + '/CreateNewUserFromNhansu', this.form.value)
                .pipe(takeUntil(this.destroyed$));
            updateUser$.subscribe(() => {
                // show notification
                this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_UPDATE_DONE);
                // close form
                this.closeForm();
            });
        }
    }

    closeForm() {
        this.windowRef.close();
    }
}
