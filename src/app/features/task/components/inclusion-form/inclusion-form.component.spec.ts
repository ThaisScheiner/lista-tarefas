import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InclusionFormComponent } from './inclusion-form.component';

describe('InclusionFormComponent', () => {
  let component: InclusionFormComponent;
  let fixture: ComponentFixture<InclusionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InclusionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InclusionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
