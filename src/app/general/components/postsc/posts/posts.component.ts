import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import {MatDialog} from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  comments: any  = [];
  userId: number = 0;
  showMenu = false
  constructor(
    private postService: PostService,
    private commentsService: CommentsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.postService.getAllPost()
      .subscribe(data =>
        this.posts = data)


        this.userId = Number(localStorage.getItem("userId"));
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
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

  deletePost(id: number){
    if(this.confirmDelete()){
      this.postService.deletePost(id)
      .subscribe(response => {
        location.reload()
      })
    }
  }

  confirmDelete(): boolean {
    return confirm("¿Estás seguro de que quieres eliminer este comentario?")
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);

  }
  
}