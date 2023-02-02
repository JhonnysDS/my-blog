import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  form: FormGroup;
  postId: number = 0;
  post: Post = {
    id:0,
    title: '',
    content: '',
    user_id: 0
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private postService:PostService,
    private route: ActivatedRoute,
    private router:Router,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group(
      {
        title: [''],
        content: ['']
      }
    )
   }

  ngOnInit(

  ): void {
    //Tomar la id del comentario, para implementarlo en el getComment
    this.route.paramMap.subscribe(params => {
      this.postId = Number(params.get('id'))
    })
    
    this.getPost()
  }

  getPost(){
    this.postService.getPost(this.data.id)
    .subscribe(data =>{
      this.post = data
      
      
      
    })
  }

  editPost(){
    this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    .subscribe(Response => {
      
    })
  }
}
