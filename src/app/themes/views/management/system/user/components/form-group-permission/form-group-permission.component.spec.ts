/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGroupPermissionComponent } from './form-group-permission.component';

describe('FormGroupPermissionComponent', () => {
    let component: FormGroupPermissionComponent;
    let fixture: ComponentFixture<FormGroupPermissionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormGroupPermissionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormGroupPermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
