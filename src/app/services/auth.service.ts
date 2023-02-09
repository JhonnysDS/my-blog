import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

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

  loginUser(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    return this.http.post('http://localhost:5000/login', body)
  }


  //   addToken(token: string) {
  //     let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //     this.headers = headers;
  // }


  getToken() {
    return this.token || localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }
}
