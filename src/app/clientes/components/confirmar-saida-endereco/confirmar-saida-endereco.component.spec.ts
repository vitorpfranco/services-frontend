import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarSaidaEnderecoComponent } from './confirmar-saida-endereco.component';

describe('ConfirmarSaidaEnderecoComponent', () => {
  let component: ConfirmarSaidaEnderecoComponent;
  let fixture: ComponentFixture<ConfirmarSaidaEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarSaidaEnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarSaidaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
