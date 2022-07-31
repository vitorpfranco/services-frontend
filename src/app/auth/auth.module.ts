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


@NgModule({
  declarations: [
    LoginComponent,
    ConfiguracoesComponent,
    ConfirmarDesativacaoComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    SharedComponentsModule
  ]
})
export class AuthModule { }
