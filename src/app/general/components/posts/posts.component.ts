import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService:PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postService.getAllPost()
    .subscribe(data =>
     this.posts = data )
  }

  viewPost(post: Post){
    this.router.navigate(['/post', post.id])
  }




}
