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
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
   
  }

  MessageFieldsRequire(): void {
    this.message.error('El titulo y el contenido son requeridos');
  }

  onSubmit(form: any) {
    this.postService.createPost(form)
      .subscribe(data => {
        if (data.message === 'Title and content are required') {
          this.MessageFieldsRequire() 
        } else {
          localStorage.setItem('postCreated', 'Success');
          this.postService.sendData('sucess')
          location.reload()
        }


      })
  }




}
