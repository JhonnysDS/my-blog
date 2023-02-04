import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

import { MatDialog } from '@angular/material/dialog';
import { EditCommentsComponent } from '../edit-comments/edit-comments.component';
import { DeleteCommentComponent } from '../delete-comment/delete-comment.component';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {
  comments: any = [];
  userId: number = 0;
  @Input() postId: number = 0;
  constructor(
    private commentsService:CommentsService,
    private dialog: MatDialog,
    private message: NzMessageService,

  ) {

    //Alerta para mostrar el mensaje de success
    const commentEdited = localStorage.getItem('commentEdited');
    console.log(commentEdited);
    if (commentEdited) {
      this.startShowMessages();
      localStorage.removeItem('commentEdited');
    }

   }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));

    this.getComments();

  }



  getComments(){
    setTimeout(()=>{
      this.commentsService.getCommentsById(this.postId)
      .subscribe(data => {  
        this.comments = data
      })
    }, 500
    
    )
  }

  confirmDelete(): boolean {
    return confirm("¿Estás seguro de que quieres eliminer este comentario?")
  }
  // deleteComment(id: number){
  //   if(this.confirmDelete()){
  //     this.commentsService.deleteComment(id)
  //     .subscribe(response => {
  //       location.reload();
  //     })
  //   }
  // }


  deleteComment(id: number) {
    this.dialog.open(DeleteCommentComponent, {
      data: {
        id: id,
      }
    })
  }



  editComment(id: number){
    this.dialog.open(EditCommentsComponent, {
      data: {
        id: id
      }
    });

  }

  startShowMessages(): void {
    this.message
      .success('Editado con exito!', { nzDuration: 2500 })
  }

}
