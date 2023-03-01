import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  registerMessage: string = '';
  showAlert: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', Validators.required],
      password: ['', Validators.required],
    })
    
  }
  


  ngOnInit(): void {}

  onSubmitForm(){
    this.authService.registerUser(this.form.value)
    .subscribe(res => {
      if (res.message === 'Error creating user') {    
        this.registerMessage = "Error al crear el usuario."
        this.messageRegisterFailed()
      } else if (res.message === 'sorry, the email and the username already exist') {
        this.registerMessage = "Lo sentimos, este usuario y correo ya existen"
        this.messageRegisterFailed()
      }else if (res.message ==='sorry, the username already exist'){
        this.registerMessage = "Lo sentimos, este usuario ya existe"
        this.messageRegisterFailed()
      }else if (res.message ==='sorry, the email already exist'){
        this.registerMessage = "Lo sentimos, ya existe una cuenta con este correo"
        this.messageRegisterFailed()
      }else{
        this.onSubmitFormLogin()
      }

    }
    )

  }

  messageRegisterFailed(): void {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
    }, 3000)
  }

  onSubmitFormLogin() {
    this.authService.loginUser(this.form.value.username, this.form.value.password)
      .subscribe((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.user_id);
          this.router.navigate(["/posts/"]);
          setTimeout(() => {
            location.reload();
          }, 500);
        }
      );
  }

}
