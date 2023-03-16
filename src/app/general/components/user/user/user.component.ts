import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { FileUpload } from 'src/app/model/fileUpload.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: number = 0;
  username: string = ''
  email: string = ''
  avatar: FileUpload | string | null = null;
  editUser: boolean = false
  avatarUrl = 'http://localhost:5000/static/images/profile/'

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;

    }
    this.getDatasUser()
    
  }
  
  getDatasUser() {
    this.authService.foundUser(this.userId)
    .subscribe(response => {
      this.username = response.username;
      this.email = response.email;
      const avatarString = response.avatar.replace(/'/g, '"').replace(/True/g, 'true');
      this.avatar = JSON.parse(avatarString);
      if (this.avatar && typeof this.avatar === 'object' && this.avatar.imageServer) {
        this.avatar = `${this.avatar.imagePath}${this.avatar.imageExt}`;
      }
    });

  }

  updateDataButton(){
    this.editUser = !this.editUser
    
  }


}

