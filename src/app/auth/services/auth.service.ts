import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = 'http://localhost:8080'
  private jwt = new JwtHelperService()

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(user: User): Observable<{ Authorization: string }> {
    return this.http.post<{ Authorization: string }>(`${this.baseUrl}/login`, user)
      .pipe(
        tap((response) => {
          this.armazenarToken(response.Authorization)
        })
      )
  }

  signOut(): void {
    this.removerToken()
    this.router.navigateByUrl('/auth/login')
  }

  armazenarToken(token: string): void {
    localStorage.setItem('authorization', token)
  }

  removerToken(): void {
    localStorage.removeItem('authorization')
  }

  recuperarToken(): string | null {
    return localStorage.getItem('authorization')
  }

  logado(): boolean {
    const token = this.recuperarToken()

    if (token == null) {
      return false
    }

    return !this.jwt.isTokenExpired(token)
  }

  emailUsuario() {
    const token = this.recuperarToken()
    const decode = this.jwt.decodeToken(token!)
    return decode
  }

  tempoApp() {
    const token = this.recuperarToken()?.toString()
    return this.jwt.getTokenExpirationDate(token)
  }

  cadastrarUsuario(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/servicos/usuarios`, user)
  }

  alterarSenha(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/servicos/usuarios`, user)
  }

  desabilitarUsuario(email: string) {
    return this.http.delete<User>(`${this.baseUrl}/servicos/usuarios/desabilitar/${email}`)
  }

}
