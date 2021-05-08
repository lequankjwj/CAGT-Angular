/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RequireLoginUserComponent } from './require-login-user.component';

describe('RequireLoginUserComponent', () => {
    let component: RequireLoginUserComponent;
    let fixture: ComponentFixture<RequireLoginUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RequireLoginUserComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequireLoginUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
