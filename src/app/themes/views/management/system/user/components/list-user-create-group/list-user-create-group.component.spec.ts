import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserCreateGroupComponent } from './list-user-create-group.component';

describe('ListUserCreateGroupComponent', () => {
    let component: ListUserCreateGroupComponent;
    let fixture: ComponentFixture<ListUserCreateGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListUserCreateGroupComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListUserCreateGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
