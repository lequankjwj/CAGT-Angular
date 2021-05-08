/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportSampleComponent } from './report-sample.component';

describe('ReportSampleComponent', () => {
    let component: ReportSampleComponent;
    let fixture: ComponentFixture<ReportSampleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReportSampleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportSampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
