import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreedBoxEditorHierarchyTreeComponent } from './hierarchy-tree.component';

describe('ThreedBoxEditorHierarchyTreeComponent', () => {
  let component: ThreedBoxEditorHierarchyTreeComponent;
  let fixture: ComponentFixture<ThreedBoxEditorHierarchyTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedBoxEditorHierarchyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedBoxEditorHierarchyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
