import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  emailUser!: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.emailUser= this.emailUsuario()
  }

  emailUsuario():string {
    const email= this.authService.emailUsuario().sub
    return email
  }
}
