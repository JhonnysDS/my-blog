import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
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
    private commentsService: CommentsService, //injectamos el servicio de comentarios,

  ) {
  }

  ngOnInit(): void {
     this.route.params
      .subscribe(params => {
        const id = params['id']
        this.postService.getPost(id)
          .subscribe(data => this.post = data)
        
        this.commentsService.getCommentsById(id)
          .subscribe(data => this.comments = data) // asignamos los comentarios a la propiedad del componente
      })
}

}
