import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './general/components/auth/login/login.component';
import { RegisterComponent } from './general/components/auth/register/register.component';
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
    private authService: AuthService,
    private route: ActivatedRoute
  ) {

    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.isLoggedIn) {
      this.componentToShow = LoginComponent;

    } else {
      this.componentToShow = SidenavComponent;
    }
  }
}




