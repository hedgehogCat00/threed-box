import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedBoxEditorComponent } from './threed-box-editor.component';

describe('ThreedBoxEditorComponent', () => {
  let component: ThreedBoxEditorComponent;
  let fixture: ComponentFixture<ThreedBoxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreedBoxEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBoxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
