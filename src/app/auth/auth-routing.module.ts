import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { CadastrarUsuarioComponent } from './components/cadastrar-usuario/cadastrar-usuario.component';
import { DesativarContaComponent } from './components/desativar-conta/desativar-conta.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
    children: [
      {
        path: 'cadastrar-usuario',
        component: CadastrarUsuarioComponent
      },
      {
        path: 'desativar-conta',
        component: DesativarContaComponent
      },
      {
        path: 'alterar-senha',
        component: AlterarSenhaComponent
      }
    ]

  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
