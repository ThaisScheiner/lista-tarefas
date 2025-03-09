import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeTaskFormComponent } from './include-task-form.component';

describe('IncludeTaskFormComponent', () => {
  let component: IncludeTaskFormComponent;
  let fixture: ComponentFixture<IncludeTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeTaskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncludeTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
