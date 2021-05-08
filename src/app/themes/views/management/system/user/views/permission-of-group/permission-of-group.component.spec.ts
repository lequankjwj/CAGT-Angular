/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PermissionOfGroupComponent } from './permission-of-group.component';

describe('PermissionOfGroupComponent', () => {
    let component: PermissionOfGroupComponent;
    let fixture: ComponentFixture<PermissionOfGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PermissionOfGroupComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PermissionOfGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
