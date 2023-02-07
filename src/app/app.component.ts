import { Component } from '@angular/core';
import { LoginComponent } from './general/components/auth/login/login.component';
import { PostsComponent } from './general/components/postsc/posts/posts.component';
import { AuthService } from './services/auth.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  componentToShow: any;

  constructor(
    private authService: AuthService
  ){
    this.isLoggedIn = this.authService.isLoggedIn();
    this.componentToShow = this.isLoggedIn ? SidenavComponent : LoginComponent;
  }



}
  
