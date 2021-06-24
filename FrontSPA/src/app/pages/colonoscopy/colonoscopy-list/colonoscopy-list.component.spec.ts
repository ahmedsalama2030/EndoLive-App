import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonoscopyListComponent } from './colonoscopy-list.component';

describe('ColonoscopyListComponent', () => {
  let component: ColonoscopyListComponent;
  let fixture: ComponentFixture<ColonoscopyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColonoscopyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColonoscopyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
