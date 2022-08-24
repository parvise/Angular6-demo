import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDailogComponent } from './mat-confirm-dailog.component';

describe('MatConfirmDailogComponent', () => {
  let component: MatConfirmDailogComponent;
  let fixture: ComponentFixture<MatConfirmDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatConfirmDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
