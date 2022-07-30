import { FormClientesComponent } from './components/form-cliente/form-cliente.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEnderecoComponent } from './components/add-endereco/add-endereco.component';
import { EditEnderecoComponent } from './components/edit-endereco/edit-endereco.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ConfirmarSaidaEnderecoComponent } from './components/confirmar-saida-endereco/confirmar-saida-endereco.component';


@NgModule({
  declarations: [
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
    ClienteComponent,
    ListarClientesComponent,
    FormClientesComponent,
    AddEnderecoComponent,
    EditEnderecoComponent,
    ConfirmarSaidaEnderecoComponent
  ],


  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class ClientesModule { }
