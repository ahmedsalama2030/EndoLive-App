import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopScrollComponent } from './top-scroll.component';

describe('TopScrollComponent', () => {
  let component: TopScrollComponent;
  let fixture: ComponentFixture<TopScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
