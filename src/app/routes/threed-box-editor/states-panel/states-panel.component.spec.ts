import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesPanelComponent } from './states-panel.component';

describe('StatesPanelComponent', () => {
  let component: StatesPanelComponent;
  let fixture: ComponentFixture<StatesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
