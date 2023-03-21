import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { FileUpload } from 'src/app/model/fileUpload.model';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  imageUpload: FileUpload | null = null;
  imageServer: FileUpload | null = null

  

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) {
      this.formUpdate = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        avatar: [this.imageUpload],

      })
     }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;
    }
    this.getDatasUser()
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
      console.log(res);
      
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


}

