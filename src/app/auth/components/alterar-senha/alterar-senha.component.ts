import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  userEmail!: string
  senhaForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordsMatchValidator() })


  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = this.authService.emailUsuario().sub
  }
  alterarSenha() {
    const c: User = {
      login: this.userEmail,
      password: this.senhaForm.value.password
    }

    this.authService.alterarSenha(c).subscribe(() => {
      this.snackbar.open('Senha alterada com sucesso.', 'Ok', {
        duration: 3000
      })
      this.senhaForm.reset();
    })
  }
}
