/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddUserToGroupComponent } from './add-user-to-group.component';

describe('AddUserToGroupComponent', () => {
    let component: AddUserToGroupComponent;
    let fixture: ComponentFixture<AddUserToGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddUserToGroupComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUserToGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
