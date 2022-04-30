import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutrecettesComponent } from './ajoutrecettes.component';

describe('AjoutrecettesComponent', () => {
  let component: AjoutrecettesComponent;
  let fixture: ComponentFixture<AjoutrecettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutrecettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutrecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
