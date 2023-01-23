import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  comments: any  = [];

  constructor(
    private postService: PostService,
    private commentsService: CommentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postService.getAllPost()
      .subscribe(data =>
        this.posts = data)
  }

  viewPost(post: Post) {
    this.commentsService.getCommentsById(post.id).subscribe(data => {
      this.comments = data;
    });
    this.router.navigate(['/post', post.id])
  }

  editPost(id: number){
    this.router.navigate(['edit-post', id]);
  }
}