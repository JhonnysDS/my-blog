import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  onSubmitForm() {
    this.authService.loginUser(this.form.value.username, this.form.value.password)
      .subscribe((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.user_id)
          
          // this.authService.addToken(res.token);
          this.router.navigate(["/posts/"])
        }
      );
  }

  ngOnInit(): void {
  }

}

