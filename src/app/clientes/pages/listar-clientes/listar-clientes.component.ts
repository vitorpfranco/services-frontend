import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Endereco } from 'src/app/enderecos/models/endereco';
import { AddEnderecoComponent } from '../../components/add-endereco/add-endereco.component';
import { ClienteComponent } from '../../components/cliente/cliente.component';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { EditEnderecoComponent } from '../../components/edit-endereco/edit-endereco.component';
import { FormClientesComponent } from '../../components/form-cliente/form-cliente.component';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';


@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Cliente[] = []

  colunas: Array<string> = ['id', 'nome', 'descricao', 'endereco', 'actions']

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private titleService: Title,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Clientes Service")

    this.clienteService.atualizarClientesSub$.subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarClientes()
        }
      }
    )
  }

  recuperarClientes(): void {
    this.clienteService.getClientes().subscribe(
      (carg) => {
        this.clientes = carg
      },
      (erro) => {
        console.log(erro)
      }
    )
  }

  abrirFormClientes(): void {

    const referenciaDialog = this.dialog.open(FormClientesComponent, {
      disableClose: true,
      maxWidth: '400px',
      width: '90%',
    })
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarClientes()
      }
    )

  }

  deletarCliente(cliente: Cliente): void {

    const referenciaDialog = this.dialog.open(ConfirmarDelecaoComponent)

    referenciaDialog.afterClosed()
      .subscribe(
        deletar => {
          if (deletar) {
            this.clienteService.deleteCliente(cliente).subscribe(
              () => {
                this.snackbar.open('Cliente deletado', 'Ok', {
                  duration: 3000
                })
                this.recuperarClientes()
              },
              (error) => {
                this.snackbar.open('Não foi possível deletar o cliente', 'Ok', {
                  duration: 3000
                })
                console.log(error)
              }
            )
          }
        }
      )
  }

  addEndereco(idCliente: number) {
    const dialog = this.dialog.open(AddEnderecoComponent, {
      data: idCliente,
      disableClose: true,
      maxWidth: '400px',
      width: '90%'
    })
    dialog.afterClosed().subscribe(
      () => {
        this.recuperarClientes()
      }
    )
  }

  editEndereco(endereco: Endereco) {
    const dialog = this.dialog.open(EditEnderecoComponent, {
      data: endereco,
      disableClose: true,
      maxWidth: '400px',
      width: '90%'
    })
    dialog.afterClosed().subscribe(
      () => {
        this.recuperarClientes()
      }
    )
  }

  editarCliente(cliente: Cliente) {
    const dialog = this.dialog.open(ClienteComponent, {
      data: cliente,
      disableClose: true,
      maxWidth: '400px',
      width: '90%'
    })
    dialog.afterClosed().subscribe(
      () => {
        this.recuperarClientes()
      }
    )
  }

}
