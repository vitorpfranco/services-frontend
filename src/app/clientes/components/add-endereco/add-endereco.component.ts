import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnderecoService } from 'src/app/enderecos/services/endereco.service';
import { ConfirmarSaidaEnderecoComponent } from '../confirmar-saida-endereco/confirmar-saida-endereco.component';

@Component({
  selector: 'app-add-endereco',
  templateUrl: './add-endereco.component.html',
  styleUrls: ['./add-endereco.component.css']
})
export class AddEnderecoComponent implements OnInit {

  idCliente!: number
  salvandoEndereco: boolean = false

  formEndereco: FormGroup = this.fb.group({
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    uf: ['', [Validators.required, Validators.maxLength(2)]]
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private enderecoService: EnderecoService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idCliente = this.data
  }

  salvar() {
    this.salvandoEndereco = true
    this.enderecoService.salvarEndereco(this.formEndereco.value, this.idCliente).subscribe(
      () => {
        this.snackbar.open('Endereço salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }

  sair() {
    
    if (this.formEndereco.value.rua.length > 0 || this.formEndereco.value.bairro.length > 0 || this.formEndereco.value.cidade.length > 0 || this.formEndereco.value.uf.length > 0) {          
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
