import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  cadastroForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })


  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
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

}
