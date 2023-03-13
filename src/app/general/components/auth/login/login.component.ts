import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showAlert: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmitForm() {
    this.authService.loginUser(this.form.value.username, this.form.value.password)
      .subscribe((res) => {
        if (res.message === 'Invalid username or password') {
          this.messageLoginFailed()
        } else {
          localStorage.setItem('token', res.token);
          this.router.navigate(["/posts/"]);
          this.loadingLogin()
          localStorage.setItem('userLoggedIn', 'success');
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      }
      );
  }

  ngOnInit(): void { }


  messageLoginFailed(): void {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
    }, 3000)
  }

  loadingLogin(): void {
    this.message
      .loading('Cargando...', { nzDuration: 2500 })
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
    setTimeout(() => {
    location.reload()
    },100)
  
}
}

