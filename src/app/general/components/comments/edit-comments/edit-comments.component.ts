import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Comment } from 'src/app/model/comment.model';
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
    private commentsService:CommentsService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { 
    this.form = this.formBuilder.group({
      content: ['']
    })
  }

  ngOnInit(): void {
    //Tomar la id del comentario, para implementarlo en el getComment
    this.route.paramMap.subscribe(params => {
      this.commentId = Number(params.get('id'))
      
    })

    this.getComment()
  }

  getComment(){
    this.commentsService.getComment(this.commentId)
    .subscribe(comments => {
      if (comments && comments.length > 0){
        this.contentComment = comments[0].content
        this.postId = comments[0].post_id
     }
   });
    }

  editComment(){
    const commentData= this.form.value;
    this.commentsService.editComment(this.commentId, commentData)
    .subscribe(response => {
      this.router.navigate(['/post', this.postId])
    })
  }

}
