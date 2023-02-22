import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  formCreate = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  constructor(
    private postService: PostService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
   
  }

  MessageFieldsRequire(): void {
    this.message.error('El titulo y el contenido son requeridos');
  }
  MessagePostExist(): void {
    this.message.info('Lo sentimos pero ya existe un post con este título');
  }

  onSubmit(form: any) {
    const postData = [form]; // Agregamos los datos dentro de un arreglo
  
    this.postService.createPost(postData)
      .subscribe(data => {
        if (data.message === 'Title and content are required') {
          this.MessageFieldsRequire() 
        } else if (data.message === 'This post already exists'){
          this.MessagePostExist()
          
        }else{
          localStorage.setItem('postCreated', 'Success');
          this.postService.sendData('sucess')
          location.reload()
        }
      })
  }
  




}
