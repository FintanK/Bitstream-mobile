import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrComponent } from './vr.component';

describe('VrComponent', () => {
  let component: VrComponent;
  let fixture: ComponentFixture<VrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
