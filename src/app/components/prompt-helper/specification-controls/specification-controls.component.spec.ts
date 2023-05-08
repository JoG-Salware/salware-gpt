import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationControlsComponent } from './specification-controls.component';

describe('SpecificationControlsComponent', () => {
  let component: SpecificationControlsComponent;
  let fixture: ComponentFixture<SpecificationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
