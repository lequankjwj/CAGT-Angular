import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@core/data-services/api.service';
import { NotificationService } from '@core/services/common/notification.service';
import { MessageConstant } from '@core/constants/message.constant';
import { UrlConstant } from '@core/constants/url.constant';
import { IGroupUser } from '@core/models/users/users.model';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtil } from '@core/utils/form';

@Component({
    selector: 'app-form-group-user',
    templateUrl: './form-group-user.component.html',
    styleUrls: ['./form-group-user.component.scss'],
})
export class FormGroupUserComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: IGroupUser;
    @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();

    form: FormGroup;

    private destroyed$ = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private notificationService: NotificationService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            userId: [0],
            groupName: ['', Validators.required],
        });

        if (this.model) {
            this.form.patchValue({
                userId: this.model.id,
                groupName: this.model.groupName,
            });
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
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
                    const createUser$ = this.apiService
                        .post(UrlConstant.API.SYSTEM.USERS + '/UserGroups', this.form.value)
                        .pipe(takeUntil(this.destroyed$));
                    createUser$.subscribe(() => {
                        // show notification
                        this.notificationService.showSuccessMessage(MessageConstant.COMMON.MSG_CREATE_DONE);
                        // close form
                        this.closeForm();
                    });
                    break;
                case ActionEnum.UPDATE:
                    const updateUser$ = this.apiService
                        .put(UrlConstant.API.SYSTEM.USERS + '/UserGroups', this.form.value)
                        .pipe(takeUntil(this.destroyed$));
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

    closeForm() {
        this.windowRef.close();
    }
}
