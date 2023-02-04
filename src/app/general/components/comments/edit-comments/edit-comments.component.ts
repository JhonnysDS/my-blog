import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Comment } from 'src/app/model/comment.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comments',
  templateUrl: './edit-comments.component.html',
  styleUrls: ['./edit-comments.component.scss']
})
export class EditCommentsComponent implements OnInit {

  contentComment: String = '';
  form: FormGroup;
  postId: any = 0
  commentId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService:CommentsService,
    private formBuilder:FormBuilder,


    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form = this.formBuilder.group({
      content: ['']
    })
  }

  ngOnInit(): void {

    this.getComment()

 
   
  }

  getComment(){
    this.commentsService.getComment(this.data.id)
    .subscribe(comments => {
      if (comments && comments.length > 0){
        this.contentComment = comments[0].content
        this.postId = comments[0].post_id
     }
   });
    }

  editComment(){
    const commentData= this.form.value;
    this.commentsService.editComment(this.data.id, commentData)
    .subscribe(response => {
      localStorage.setItem('commentEdited', JSON.stringify(response));
      location.reload()
    })
  }

 

}
