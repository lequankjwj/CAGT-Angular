/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormReportSampleComponent } from './form-report-sample.component';

describe('FormReportSampleComponent', () => {
    let component: FormReportSampleComponent;
    let fixture: ComponentFixture<FormReportSampleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormReportSampleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormReportSampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
