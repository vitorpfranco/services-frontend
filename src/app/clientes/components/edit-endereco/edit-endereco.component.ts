import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { EnderecoService } from 'src/app/enderecos/services/endereco.service';
import { ConfirmarSaidaEnderecoComponent } from '../confirmar-saida-endereco/confirmar-saida-endereco.component';

@Component({
  selector: 'app-edit-endereco',
  templateUrl: './edit-endereco.component.html',
  styleUrls: ['./edit-endereco.component.css']
})
export class EditEnderecoComponent implements OnInit {

  endereco!: Endereco
  salvandoEndereco: boolean = false
  desabilitar: boolean = true

  formEndereco: FormGroup = this.fb.group({
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<EditEnderecoComponent>,
    @Inject (MAT_DIALOG_DATA)
    public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.recuperarEndereco()
  }

  recuperarEndereco() {
    this.endereco = this.data
    this.formEndereco.setValue({
      rua: this.endereco.rua,
      bairro: this.endereco.bairro,
      cidade: this.endereco.cidade,
      uf: this.endereco.uf
    })
    this.valorMudou()
  }

  valorMudou() {
    this.formEndereco.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formEndereco.invalid || !(valores.rua != this.endereco.rua || valores.bairro != this.endereco.bairro || valores.cidade != this.endereco.cidade || valores.uf != this.endereco.uf)
      }
    )
  }

  atualizar() {
    this.salvandoEndereco = true
    Object.assign(this.endereco, this.formEndereco.value)
    this.enderecoService.atualizarEndereco(this.endereco).subscribe(
      () => {
        this.snackbar.open('Endereço atualizado com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }

  sair() {
    if (!this.desabilitar) {          
      this.dialog.open(ConfirmarSaidaEnderecoComponent)
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
