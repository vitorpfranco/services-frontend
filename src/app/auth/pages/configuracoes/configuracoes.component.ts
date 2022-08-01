import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ConfirmarDesativacaoComponent } from '../../components/confirmar-desativacao/confirmar-desativacao.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  usuario!: User

  cadastroForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Configurações")
  }



  cadastrar() {
    this.authService.cadastrarUsuario(this.cadastroForm.value).subscribe(
      () => {
        this.snackbar.open('Usuário cadastrado com sucesso.', 'Ok', {
          duration: 3000
        })

        this.cadastroForm.reset()
      }
    )
  }

  desativarConta() {
    const email = this.authService.emailUsuario().sub
    this.dialog.open(ConfirmarDesativacaoComponent).afterClosed().subscribe(
      (response) => {
        if (response) {
          this.authService.desabilitarUsuario(email).subscribe(
            () => {
              this.snackbar.open('Conta desativada', 'Ok', {
                duration: 3000
              })
              this.authService.signOut()
            }
          )
        }
      }
    )

  }

}
