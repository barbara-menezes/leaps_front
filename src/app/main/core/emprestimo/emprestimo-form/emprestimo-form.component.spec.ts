import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoFormComponent } from './emprestimo-form.component';

describe('StudentFormComponent', () => {
  let component: EmprestimoFormComponent;
  let fixture: ComponentFixture<EmprestimoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprestimoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestimoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
