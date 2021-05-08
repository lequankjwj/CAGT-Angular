import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserTreeComponent } from './select-user-tree.component';

describe('SelectUserTreeComponent', () => {
    let component: SelectUserTreeComponent;
    let fixture: ComponentFixture<SelectUserTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectUserTreeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectUserTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
