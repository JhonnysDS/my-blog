import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

import { MatDialog } from '@angular/material/dialog';
import { EditCommentsComponent } from '../edit-comments/edit-comments.component';
import { DeleteCommentComponent } from '../delete-comment/delete-comment.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {
  comments: any = [];
  userId: number = 0;
  @Input() postId: number = 0;
  showMessageNotCommentsOn: boolean= false
  showProgress: boolean = false
  constructor(
    private commentsService:CommentsService,
    private dialog: MatDialog,
    private message: NzMessageService,

  ) {

    
    //Alertas de succes al editar y eliminar comentario
    const commentData = {
      edited: localStorage.getItem('commentEdited'),
      deleted: localStorage.getItem('commentDeleted')
    };
    
    if (commentData.edited) {
      this.messageCommentEdited();
      localStorage.removeItem('commentEdited');
    }
    
    if (commentData.deleted) {
      this.messageCommentDeleted();
      localStorage.removeItem('commentDeleted');
    }
    //----------------------------------------------------------//

    
    
   }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.userId = decodedToken.id;
    }
   

    this.getComments();

            //Funcion para mostrar el loading del mensahe al crear el post.
            this.commentsService.data$.subscribe(data => {
              if('success'){
                this.messageCommentLoading()
              }
            });

  }



  getComments(){
    setTimeout(()=>{
      this.commentsService.getCommentsById(this.postId)
      .subscribe(data => {
        if (data.message === "No yet commented on"){
          this.showMessageNotCommentsOn = true
        }else{
          this.comments = data
        }
      })
    }, 1000
    
    )
  }


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

  messageCommentLoading(): void {
    const id = this.message.loading('Cargando..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);
  }



  messageCommentEdited(): void {
    this.message
      .success('Comentario editado con exito!', { nzDuration: 2500 })
  }

  messageCommentDeleted(): void {
    this.message
      .success('El comentario fue eliminado', { nzDuration: 2500 })
  }

}
