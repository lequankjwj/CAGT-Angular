/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserOfGroupPermissionComponent } from './user-of-group-permission.component';

describe('UserOfGroupPermissionComponent', () => {
    let component: UserOfGroupPermissionComponent;
    let fixture: ComponentFixture<UserOfGroupPermissionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserOfGroupPermissionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserOfGroupPermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
