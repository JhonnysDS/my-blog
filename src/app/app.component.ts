import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './general/components/auth/login/login.component';
import { RegisterComponent } from './general/components/auth/register/register.component';
import { AuthService } from './services/auth.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Location } from '@angular/common';
import { ForgotPasswordComponent } from './general/components/auth/forgot-password/forgot-password.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  componentToShow: any;

  constructor(
    private authService: AuthService,
    private location: Location
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {
      const currentPath = this.location.path();
      if (currentPath === '/register') {
        this.componentToShow = RegisterComponent;
      } else if(currentPath === '/password/forgot'){
        this.componentToShow = ForgotPasswordComponent
      } else {
        this.componentToShow = LoginComponent;
      }
    } else {
      this.componentToShow = SidenavComponent;
    }
  }
}




