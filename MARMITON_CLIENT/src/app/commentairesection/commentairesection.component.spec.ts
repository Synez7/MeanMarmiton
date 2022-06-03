import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentairesectionComponent } from './commentairesection.component';

describe('CommentairesectionComponent', () => {
  let component: CommentairesectionComponent;
  let fixture: ComponentFixture<CommentairesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentairesectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentairesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
