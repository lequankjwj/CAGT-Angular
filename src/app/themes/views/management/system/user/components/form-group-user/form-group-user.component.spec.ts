/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGroupUserComponent } from './form-group-user.component';

describe('FormGroupUserComponent', () => {
    let component: FormGroupUserComponent;
    let fixture: ComponentFixture<FormGroupUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormGroupUserComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormGroupUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
