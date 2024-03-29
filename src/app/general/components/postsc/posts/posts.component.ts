import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  posts: Post[] = [];
  comments: any = [];
  userId: number=0;
  showMenu = false;
  value: any = '';
  p: number = 1;
  countPost: number = 0
  constructor(
    private postService: PostService,
    private commentsService: CommentsService,
    private router: Router,
    private dialog: MatDialog,
    private message: NzMessageService,
    private route: ActivatedRoute

  ) {


    const postsData = {
      created: localStorage.getItem('postCreated'),
      edited: localStorage.getItem('postEdited'),
      deleted: localStorage.getItem('postDeleted'),
      loggedIn: localStorage.getItem('userLoggedIn')
    };

    if (postsData.created) {
      this.messagePostCreated();
      localStorage.removeItem('postCreated');
    }

    if (postsData.edited) {
      this.messagePostEdited();
      localStorage.removeItem('postEdited');
    }

    if (postsData.deleted) {
      this.messagePostDeleted();
      localStorage.removeItem('postDeleted');
    }
    if (postsData.loggedIn) {
      this.messageUserLoggedIn();
      localStorage.removeItem('userLoggedIn');
    }



  }

  ngOnInit(): void {
    this.getAllPosts()

    
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;
    }


    //Funcion para mostrar el loading del mensahe al crear el post.
    this.postService.data$.subscribe(data => {
      if ('success') {
        this.messagePostLoading()
      }
    });


  }

  getAllPosts(){
    this.postService.getAllPost().subscribe(data => {
      this.posts = data;
      this.countPost= 0;
      for (let i = 0; i < this.posts.length; i++) {
        this.countPost++;
      }
      console.log('Número de posts:', this.countPost);
    });
  }
  



  limitText(text: string, limit: number = 200): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }



  createPost() {
    this.dialog.open(CreatePostComponent);
  }

  viewPost(post: Post) {
    this.commentsService.getCommentsById(post.id).subscribe(data => {
      this.comments = data;
    });
    this.router.navigate(['/post', post.id])
  }


  editPost(id: number) {
    this.dialog.open(EditPostComponent, {
      data: {
        id: id
      }
    });

  }

  deletePost(id: number) {
    this.dialog.open(DeletePostComponent, {
      data: {
        id: id,
      }
    })
  }

  messagePostLoading(): void {
    const id = this.message.loading('Cargando..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);
  }


  messagePostCreated(): void {
    this.message
      .success('Post creado con exito!', { nzDuration: 2500 })
  }

  messagePostEdited(): void {
    this.message
      .success('Post Editado con exito!', { nzDuration: 2500 })
  }

  messagePostDeleted(): void {
    this.message
      .success('Post eliminado con exito!', { nzDuration: 2500 })
  }
  messageUserLoggedIn(): void {
    this.message
      .success('¡Sesión iniciada con éxito!', { nzDuration: 2500 })
  }

}