import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadosService } from 'src/app/chamados/services/chamados.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['funcionario', 'atribuidos', 'concluidos', 'arquivados', 'total'];
  dataSource!: MatTableDataSource<any>
  chamadoStatus: any[] = ['Carregando', 'Carregando', 'Carregando', 'Carregando']

  constructor(private chamadosService: ChamadosService, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.chamadosPorFuncionarios()
    this.chamadosPorStatus();
  }
  chamadosPorFuncionarios() {
    this.chamadosService.chamadosPorFuncionarios().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'funcionario': return item[0];
          case 'atribuidos.': return item[1];
          case 'concluidos': return item[2];
          case 'arquivados': return item[3];
          case 'total': return item[4];
          default: return item[property];
        }
      }
      this.dataSource.sort = this.sort
    })
  }
  chamadosPorStatus() {
    this.chamadosService.chamadosPorStatus().subscribe((response) => {
      this.chamadoStatus = response      
    })
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
