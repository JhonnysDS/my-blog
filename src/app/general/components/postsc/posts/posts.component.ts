import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import {MatDialog} from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DeletePostComponent } from '../delete-post/delete-post.component';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  posts: Post[] = [];
  comments: any  = [];
  userId: number = 0;
  showMenu = false;
  value: any= '';




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
      loggedIn:localStorage.getItem('userLoggedIn')
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
    this.postService.getAllPost()
      .subscribe(data =>
        this.posts = data)


        this.userId = Number(localStorage.getItem("userId"));


        //Funcion para mostrar el loading del mensahe al crear el post.
        this.postService.data$.subscribe(data => {
          if('success'){
            this.messagePostLoading()
          }
        });


        //prueba
        
        this.route.paramMap.subscribe(params => {
          console.log(params);
        });
 
      }
        


  limitText(text: string, limit: number = 200): string {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }



  createPost(){
    this.dialog.open(CreatePostComponent);
  }

  viewPost(post: Post) {
    this.commentsService.getCommentsById(post.id).subscribe(data => {
      this.comments = data;
    });
    this.router.navigate(['/post', post.id])
  }


  editPost(id: number){
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