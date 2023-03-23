import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { FileUpload } from 'src/app/model/fileUpload.model';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  avatarPreview: FileUpload | string | null = null
  imageName: string | null = null;
  showEditUser: boolean = false
  showChangePassword: boolean = false
  avatarUrl = 'http://localhost:5000/static/images/profile/'
  formUpdate: FormGroup;
  formChangePass: FormGroup;
  imageUpload: FileUpload | null = null;
  imageServer: FileUpload | null = null

  

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private message: NzMessageService
    ) {
      this.formUpdate = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        avatar: [this.imageUpload],

      })

      this.formChangePass = this.formBuilder.group({
        old_password: ['', Validators.required],
        new_password: ['', Validators.required]
      })
     }



  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;
    }
    this.getDatasUser()

    

    //Ejecutamos la alerta al momento de recargar la pagina cuando se edite los datos
    const userAlerts = {
      edited:localStorage.getItem('userUpdated'),
      passwordChanged: localStorage.getItem('passwordChanged')
    };

    if (userAlerts.edited) {
      this.messageUserUpdatedSucces()
      localStorage.removeItem('userUpdated');
    } else if (userAlerts.passwordChanged){
      this.messagePasswordChanged()
      localStorage.removeItem('passwordChanged')
    }
  }

  getDatasUser() {
    this.authService.foundUser(this.userId)
      .subscribe(response => {
        this.username = response.username;
        this.email = response.email;
        const avatarString = response.avatar.replace(/'/g, '"').replace(/True/g, 'true');
        this.avatar = JSON.parse(avatarString);
        //tomamos la imagen del servidor y la convertimospara mostrarla en la imagen previa
        if (this.avatar && typeof this.avatar === 'object' && this.avatar.imageServer) {
          this.imageName = this.avatar.imageName;
          this.avatar = `${this.avatar.imagePath}${this.avatar.imageExt}`;
          this.avatarPreview = this.avatar
        }
      });


  }

  file: any;
  getFile(event: any) {
    this.file = event.target.files[0] 
    console.log(this.file);

  }

  onFileSelectedFormUpdate(event: any) {
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
        this.formUpdate.patchValue({ avatar: this.imageUpload });
      };
      reader.readAsDataURL(this.file);
    }
    
  }

  onUpdatePersonaInfo(){
    this.authService.updateUser(this.userId, this.formUpdate.value)
    .subscribe(res =>{
      if (res.message === 'user updated successfully'){
        localStorage.setItem('userUpdated', 'success');
        location.reload()
      }else if (res.message === 'This username already exist, please write other.'){
        this.messageUserUpdatedUsernameFailed()
      }else if (res.message === 'This email already exist, please write other.'){
        this.messageUserUpdatedEmailFailed()
      }
      
    }) 
  }

  onChangePassword(){
    this.authService.changePassword(this.userId, this.formChangePass.value)
    .subscribe(res => {
      if(res.message === 'The old password is incorrect'){
        this.messageOldPasswordFailed()
      }else if (res.message === 'Password changed successfully'){
        localStorage.setItem('passwordChanged', 'success');
        location.reload()
      }
    })
  }

  updateDataButton() {
    this.showEditUser = !this.showEditUser
  }

  changePasswordButton() {
    this.showChangePassword = !this.showChangePassword
  }

  previewImage: string | null = '';
  fileName: string | null = '';
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
    }
  }

  removeImage(): void {
    this.previewImage = null;
    this.fileName = null;
    this.imageName = null;
    this.avatarPreview = ''

    this.imageUpload = null
    this.formUpdate.patchValue({ avatar: this.imageUpload });
  }

  messageUserUpdatedSucces(): void {
    this.message.success('¡Tus datos se han actualizado con exito!');
  }

  messageUserUpdatedUsernameFailed(): void {
    this.message.error('El nombre de usuario ya existe. Por favor, elija otro.');
  }

  messageUserUpdatedEmailFailed(): void {
    this.message.error('El correo electrónico ya existe. Por favor, elija otro.');
  }

  messageOldPasswordFailed(): void {
    this.message.error('La contraseña actual es incorrecta.');
  }

  messagePasswordChanged(): void {
    this.message.success('La contraseña ha sido cambiada con éxito.');
  }


}

