import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserOfGroupPermissionComponent } from './add-user-of-group-permission.component';

describe('AddUserOfGroupPermissionComponent', () => {
    let component: AddUserOfGroupPermissionComponent;
    let fixture: ComponentFixture<AddUserOfGroupPermissionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddUserOfGroupPermissionComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUserOfGroupPermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
