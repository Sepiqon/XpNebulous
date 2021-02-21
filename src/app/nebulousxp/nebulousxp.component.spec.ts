/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NebulousxpComponent } from './nebulousxp.component';

describe('NebulousxpComponent', () => {
  let component: NebulousxpComponent;
  let fixture: ComponentFixture<NebulousxpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebulousxpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebulousxpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
