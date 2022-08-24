import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAppComponent } from './facebook-app.component';

describe('FacebookAppComponent', () => {
  let component: FacebookAppComponent;
  let fixture: ComponentFixture<FacebookAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
