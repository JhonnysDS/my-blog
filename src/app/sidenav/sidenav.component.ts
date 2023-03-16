import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { FileUpload } from '../model/fileUpload.model';

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
  avatar: FileUpload | string | null = null;
  avatarUrl = 'http://localhost:5000/static/images/profile/'

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
      const avatarString = response.avatar.replace(/'/g, '"').replace(/True/g, 'true');
      this.avatar = JSON.parse(avatarString);
      if (this.avatar && typeof this.avatar === 'object' && this.avatar.imageServer) {
        this.avatar = `${this.avatar.imagePath}${this.avatar.imageExt}`;
      }
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
