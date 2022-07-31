import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarDesativacaoComponent } from './confirmar-desativacao.component';

describe('ConfirmarDesativacaoComponent', () => {
  let component: ConfirmarDesativacaoComponent;
  let fixture: ComponentFixture<ConfirmarDesativacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarDesativacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarDesativacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
