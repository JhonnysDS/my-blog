import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: number = 0;
  username: string = ''
  email: string = ''
  created: string = ''
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;
      
    }

    this.getDatasUser()
  }

  getDatasUser(){
    this.authService.foundUser(this.userId)
    .subscribe(response => {
      this.username = response.username
      this.email = response.email
      this.created = response.created_at
      
    })
    
  }

}
