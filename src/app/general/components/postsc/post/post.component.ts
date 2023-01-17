import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup
  comments: any = []; // nueva propiedad para almacenar los comentarios
  commentContent: string = '';
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private commentsService: CommentsService, //injectamos el servicio de comentarios,
    private formBuilder: FormBuilder,
    private router: Router

  ) {
    this.form=this.formBuilder.group({
      content: ['',]
    })
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


createComment() {
  const commentData = this.form.value;
  this.commentsService.createComment(this.post.id, commentData)

  .subscribe(response => {    
    this.router.navigate(['/post',this.post.id])
    location.reload();
    // manejar la respuesta del servidor
  });
}


}
