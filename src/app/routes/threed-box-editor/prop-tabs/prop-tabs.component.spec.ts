import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropTabsComponent } from './prop-tabs.component';

describe('PropTabsComponent', () => {
  let component: PropTabsComponent;
  let fixture: ComponentFixture<PropTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
