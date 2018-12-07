import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiseModalComponent } from './choise-modal.component';

describe('ChoiseModalComponent', () => {
  let component: ChoiseModalComponent;
  let fixture: ComponentFixture<ChoiseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
