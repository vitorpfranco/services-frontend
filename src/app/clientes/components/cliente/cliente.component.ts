import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente!: Cliente

  formCliente: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  })

  desabilitar: boolean = true
  salvandoCliente: boolean = false

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ClienteComponent>,
    @Inject (MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    this.recuperarCliente()
  }

  recuperarCliente(): void {
      this.cliente = this.data
      this.formCliente.setValue({
        nome: this.cliente.nome,
        email: this.cliente.email
      })
      this.valorMudou()
  }

  valorMudou() {
    this.formCliente.valueChanges
    .subscribe(
      (valores) => {
        this.desabilitar = this.formCliente.invalid || !(valores.nome != this.cliente.nome || valores.email != this.cliente.email)
    })
  }


  atualizar(): void {
    this.salvandoCliente = true
    const c: Cliente = {...this.formCliente.value}
    c.idCliente = this.cliente.idCliente

    this.clienteService.atualizarCliente(c)
    .subscribe(
      (carg) => {
        this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
        }
        )
  }

  sair() {
    if (!this.desabilitar) {
      this.dialog.open(ConfirmarSaidaComponent).afterClosed().subscribe(
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
