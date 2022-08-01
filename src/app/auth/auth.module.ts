import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ConfirmarDesativacaoComponent } from './components/confirmar-desativacao/confirmar-desativacao.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { DesativarContaComponent } from './components/desativar-conta/desativar-conta.component';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
    ConfiguracoesComponent,
    ConfirmarDesativacaoComponent,
    AlterarSenhaComponent,
    DesativarContaComponent,
    CadastrarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    SharedComponentsModule,
    RouterModule
  ]
})
export class AuthModule { }
