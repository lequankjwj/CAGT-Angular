import { Input, OnDestroy, OnInit } from '@angular/core';
import { ActionEnum } from '@core/constants/enum.constant';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { FormGroup } from '@angular/forms';
import { DropDownListEnum } from '@shared/containers/asc-select/asc-select.enum';
import { Subject } from 'rxjs';

export abstract class BaseUserFormComponent<T> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;
    @Input() model: T;

    form: FormGroup;
    dropdownListEnum = DropDownListEnum;

    protected destroyed$ = new Subject();
    constructor(protected windowRef: WindowRef) {}

    ngOnInit(): void {
        this.createForm();

        if (this.action === ActionEnum.UPDATE) {
            this.form.patchValue(this.model);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.windowRef.close();
    }

    protected abstract createForm();

    protected abstract onSubmit();
}
