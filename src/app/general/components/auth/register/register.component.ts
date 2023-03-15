import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/model/fileUpload.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  registerMessage: string = '';
  showAlert: boolean = false;
  imageUpload: FileUpload | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: [this.imageUpload]
    })

  }



  ngOnInit(): void { }

  file: any;
  getFile(event: any) {
    this.file = event.target.files[0] 
    console.log(this.file);

  }



  onFileSelected(event: any) {
    // Obtiene el archivo seleccionado
    this.file = event.target.files[0] 
    
    // Verifica que el archivo sea una imagen
    if (this.file.type.match(/image\/*/)) {

      // Crea un objeto de archivo lector
      const reader = new FileReader();
      
      reader.onload = () => {
        let filePath = reader.result;
        const imagenFullName = this.file.name, imageSize = this.file.size, imagePath = filePath;
        const imageName = imagenFullName.substring(0, imagenFullName.lastIndexOf('.')); // Nombre sin extensión
        const imageExt = imagenFullName.substring(imagenFullName.lastIndexOf('.')); // Extensión sin nombre
        this.imageUpload = { imagenFullName, imageName, imageExt, imageSize, imagePath, imageServer: false };

        // Actualiza el valor del control "avatar" del formulario con el valor actual de "imageUpload"
        this.form.patchValue({ avatar: this.imageUpload });
      };
      
      reader.readAsDataURL(this.file);
    }
    
  }


  onSubmitForm() {
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

    console.log(this.form.value);
    
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

  redirectToLogin() {
    this.router.navigate(['/login']);
    setTimeout(() => {
      location.reload()
    }, 100)

  }

}
