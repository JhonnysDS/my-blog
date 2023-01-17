import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
     post: Post = {
    id: 0,
    title: '',
    content: '',
  };
  comments: any = []; // nueva propiedad para almacenar los comentarios
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
   
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        const id = params['id']
        this.postService.getPost(id)
          .subscribe(data => {
            this.post = data;  
            
          });
      });
  }



}
