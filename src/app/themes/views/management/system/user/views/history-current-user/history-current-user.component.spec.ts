import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCurrentUserComponent } from './history-current-user.component';

describe('HistoryCurrentUserComponent', () => {
    let component: HistoryCurrentUserComponent;
    let fixture: ComponentFixture<HistoryCurrentUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HistoryCurrentUserComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryCurrentUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
