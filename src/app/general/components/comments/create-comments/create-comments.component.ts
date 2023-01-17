import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-comments',
  templateUrl: './create-comments.component.html',
  styleUrls: ['./create-comments.component.scss']
})
export class CreateCommentsComponent implements OnInit {
  commentContent: string = '';
  form: FormGroup
  @Input() postId: number = 0;

  constructor(
    private commentsService:CommentsService,
    private router:Router,
    private formBuilder:FormBuilder
  ) {
    this.form=this.formBuilder.group({
      content: ['',]
    })
   }

  ngOnInit(): void {
  }

  createComment() {
    const commentData = this.form.value;
    this.commentsService.createComment(this.postId, commentData)
  
    .subscribe(response => {    
      this.router.navigate(['/post',this.postId])
      location.reload();
      // manejar la respuesta del servidor
    });
  }

}
