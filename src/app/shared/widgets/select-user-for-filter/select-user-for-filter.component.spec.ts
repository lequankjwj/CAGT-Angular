/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectUserForFilterComponent } from './select-user-for-filter.component';

describe('SelectUserForFilterComponent', () => {
    let component: SelectUserForFilterComponent;
    let fixture: ComponentFixture<SelectUserForFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectUserForFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectUserForFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
