import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CEditContentComponent } from './c-editcontent.component';

describe('CEditContentComponent', () => {
    let component: CEditContentComponent;
    let fixture: ComponentFixture<CEditContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CEditContentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CEditContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
