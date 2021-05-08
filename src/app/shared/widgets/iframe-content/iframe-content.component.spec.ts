/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IframeContentComponent } from './iframe-content.component';

describe('IframeContentComponent', () => {
  let component: IframeContentComponent;
  let fixture: ComponentFixture<IframeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
