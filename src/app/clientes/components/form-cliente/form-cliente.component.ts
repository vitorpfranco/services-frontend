import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClientesComponent implements OnInit {


  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  })

  salvandoCliente: boolean = false

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<FormClientesComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.salvandoCliente = true
    const c: Cliente = this.formCliente.value

    this.clienteService.salvarCliente(c).subscribe(
      () => {
        this.snackbar.open('Cliente salvo com sucesso.', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }

  sair() {
    
    if (this.formCliente.value.nome.length > 0 || this.formCliente.value.email.length > 0) {          
      this.dialog.open(ConfirmarSaidaComponent)
      .afterClosed().subscribe(
        (response) => {
          if (response) {
            this.dialogRef.close()
          }
        }
      )
    } else {
      this.dialogRef.close()
    }    
  }

}
