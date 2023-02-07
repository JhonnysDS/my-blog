import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private formBuilder:FormBuilder,
    private message: NzMessageService,

  ) {
    this.form=this.formBuilder.group({
      content: ['',]
    })
   }

  ngOnInit(): void {

    const postsData = {
      created: localStorage.getItem('commentCreated')
    };
    
    if (postsData.created) {
      this.messageCommentCreated();
      localStorage.removeItem('commentCreated');
    }
  }

  createComment() {
    const commentData = this.form.value;
    this.commentsService.createComment(this.postId, commentData)
  
    .subscribe(response => {    
      this.router.navigate(['/post',this.postId])
      this.commentsService.sendData('success')
      localStorage.setItem('commentCreated', 'success');
      
      location.reload();
      // manejar la respuesta del servidor  
    });
  }

  messageCommentCreated(): void {
    this.message
      .success('Comentario creado con exito!', { nzDuration: 2500 })
  }

}
