import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserUpdate } from '../model/user.model';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';
  

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User) {
    return this.http.post<any>('http://localhost:5000/register', user)
  }

  updateUser(id: number, userUpdate: UserUpdate){
    return this.http.put<any>(`http://localhost:5000/update/user/${id}`, userUpdate)
  }

  loginUser(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    return this.http.post('http://localhost:5000/login', body)
  }

  foundUser(id: number){
    return this.http.get<any>(`http://localhost:5000/user/${id}`)
  }


  //   addToken(token: string) {
  //     let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //     this.headers = headers;
  // }


  getToken() {
    return this.token || localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    if (!token) {
      return false; // Si no hay token, el usuario no está logueado
    }
  
    const tokenExpirationDate: Date | null = this.getTokenExpirationDate(token);
    if (tokenExpirationDate && tokenExpirationDate.getTime() <= new Date().getTime()) {
      localStorage.removeItem('token'); // Elimina el token expirado del localStorage
      localStorage.removeItem('userId'); // Elimina el usuario expirado del localStorage
      return false; // El token ha caducado, el usuario no está logueado
    }
  
    return true; // El usuario está logueado y el token es válido
  }
  
  private getTokenExpirationDate(token: string): Date | null {
    const decodedToken: JwtPayload = jwt_decode(token);
    if (!decodedToken.exp) {
      return null;
    }
  
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }
}
