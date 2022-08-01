import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ConfirmarDesativacaoComponent } from '../confirmar-desativacao/confirmar-desativacao.component';

@Component({
  selector: 'app-desativar-conta',
  templateUrl: './desativar-conta.component.html',
  styleUrls: ['./desativar-conta.component.css']
})
export class DesativarContaComponent implements OnInit {

  constructor(private authService: AuthService, private dialog: MatDialog, private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
