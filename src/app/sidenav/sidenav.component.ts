import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  showFiller = false;
  isVisible = false;
  userId: number = 0;
  username: string = ''

  constructor (
    private router: Router,
    private authService:AuthService
  ){}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;
    }

    this.getUsername()
  }

  getUsername(){
    this.authService.foundUser(this.userId)
    .subscribe(response => {
      this.username = response.username
      
    })
    
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  logout() {
    localStorage.removeItem('token');
    location.reload()
  }

}
