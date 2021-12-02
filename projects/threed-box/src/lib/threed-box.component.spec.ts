import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedBoxComponent } from './threed-box.component';

describe('ThreedBoxComponent', () => {
  let component: ThreedBoxComponent;
  let fixture: ComponentFixture<ThreedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreedBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
