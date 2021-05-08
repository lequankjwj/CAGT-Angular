/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectUserSingleComponent } from './select-user-single.component';

describe('SelectUserComponent', () => {
    let component: SelectUserSingleComponent;
    let fixture: ComponentFixture<SelectUserSingleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectUserSingleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectUserSingleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
