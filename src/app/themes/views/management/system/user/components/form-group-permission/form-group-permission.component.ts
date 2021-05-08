import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEnum } from '@core/constants/enum.constant';
import { ITreeGroupPermission } from '@core/models/permissions/permission.model';
import { PermissionService } from '@core/services/business/permission.service';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NotificationService } from '@core/services/common/notification.service';
import { FormUtil } from '@core/utils/form';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-group-permission',
    templateUrl: './form-group-permission.component.html',
    styleUrls: ['./form-group-permission.component.scss'],
    providers: [PermissionService],
})
export class FormGroupPermissionComponent implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: ITreeGroupPermission;
    @Input() parentId: number;

    form: FormGroup;

    private destroyed$ = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private permissionService: PermissionService,
        private notification: NotificationService,
        private translate: CustomTranslateService,
        private windowRef: WindowRef
    ) {}

    ngOnInit() {
        this.createFormGroup();

        if (this.action === ActionEnum.UPDATE) {
            this.form.patchValue({
                id: this.model.idGroupPermission,
                groupName: this.model.groupName,
                idParent: this.model.idParent,
                notes: this.model.notes,
            });
        }
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSubmit() {
        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

        switch (this.action) {
            case ActionEnum.CREATE:
                this.permissionService
                    .createGroupPermission(this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.CREATE_DONE'));
                        this.closeForm(true);
                    });
                break;
            case ActionEnum.UPDATE:
                this.permissionService
                    .updateGroupPermission(this.form.value)
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(() => {
                        this.notification.showSuccessMessage(this.translate.get('MES.UPDATE_DONE'));
                        this.closeForm(true);
                    });
                break;
        }
    }

    private createFormGroup() {
        this.form = this.formBuilder.group({
            id: [0],
            groupName: ['', Validators.required],
            idParent: [this.parentId ?? null],
            notes: [''],
            ordering: [0],
        });
    }

    closeForm(isLoad) {
        this.windowRef.close(isLoad);
    }
}
