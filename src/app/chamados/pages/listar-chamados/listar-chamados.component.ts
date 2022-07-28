import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Chamado } from '../../models/chamado';
import { ChamadosService } from '../../services/chamados.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { AlterarChamadoComponent } from '../../components/alterar-chamado/alterar-chamado.component';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { ClienteService } from 'src/app/clientes/service/cliente.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { Cliente } from 'src/app/clientes/models/cliente';
import { FormChamadoComponent } from '../../components/form-chamado/form-chamado.component';



@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarChamadosComponent implements OnInit, AfterViewInit {
  chamados!: Chamado[]
  colunas: string[] = ['id', 'titulo', 'data', 'funcionario', 'cliente', 'pagamento', 'status', 'actions'];
  expandedElement!: Chamado[] | null
  columnsToDisplayWithExpand = [...this.colunas, 'expand'];
  funcionarios!: Funcionario[]
  clientes!: Cliente[]

  constructor(private chamadosService: ChamadosService, private dialog: MatDialog, private snackbar: MatSnackBar, private titleService: Title, private funcionarioService: FuncionarioService, private ClienteService: ClienteService) { }

  ngAfterViewInit() {
  }



  ngOnInit(): void {
    this.getChamados()
    this.titleService.setTitle("Chamados Service")
  }

  getChamados() {
    this.chamadosService.getChamados().subscribe(
      (response) => {
        this.chamados = response
      }
    )
  }
  deletarChamado(idChamado: number) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
      .subscribe(
        (deletar) => {

          if (deletar == true) {
            this.chamadosService.deleteChamado(idChamado)
              .subscribe(
                () => {
                  this.snackbar.open('Chamado deletado', 'Ok', {
                    duration: 3000
                  })
                  this.getChamados()
                },
                (error) => {
                  this.snackbar.open('Não foi possível deletar o funcionário', 'Ok', {
                    duration: 3000
                  })
                  console.log(error)
                }
              )
          }
        }
      )
  }
  alterarChamado(chamado: Chamado) {
    const dialogRef = this.dialog.open(AlterarChamadoComponent, {
      data: {
        chamado
      }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getChamados()
    })
  }

  cadastrarChamado() {
    const dialog = this.dialog.open(FormChamadoComponent)
    dialog.afterClosed().subscribe(() => {
      this.getChamados();
    })
  }
}
