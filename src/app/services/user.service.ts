import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User){
    return this.http.post<User[]>('http://localhost:5000/register', user)
  }
}
