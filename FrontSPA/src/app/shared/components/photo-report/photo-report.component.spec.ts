import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoReportComponent } from './photo-report.component';

describe('PhotoReportComponent', () => {
  let component: PhotoReportComponent;
  let fixture: ComponentFixture<PhotoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
