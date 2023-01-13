import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmitForm(){
    this.userService.registerUser(this.form.value)
    .subscribe(data => {
      window.alert('Usuario creado con exito')
      this.router.navigate(['/posts'])
    }
    )
    
  }

}
