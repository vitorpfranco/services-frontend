import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmarLogoutComponent } from './confirmar-logout/confirmar-logout.component';
import { DatePipe } from '../pipes/date.pipe';




@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmarLogoutComponent,
    DatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule

  ],
  exports: [
    NavbarComponent,
    DatePipe
  ]
})
export class SharedComponentsModule { }
