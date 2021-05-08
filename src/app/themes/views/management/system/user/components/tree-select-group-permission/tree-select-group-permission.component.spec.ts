/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TreeSelectGroupPermissionComponent } from './tree-select-group-permission.component';

describe('TreeSelectGroupPermissionComponent', () => {
    let component: TreeSelectGroupPermissionComponent;
    let fixture: ComponentFixture<TreeSelectGroupPermissionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TreeSelectGroupPermissionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeSelectGroupPermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
