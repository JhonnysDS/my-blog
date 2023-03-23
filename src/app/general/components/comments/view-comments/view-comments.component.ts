import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

import { MatDialog } from '@angular/material/dialog';
import { EditCommentsComponent } from '../edit-comments/edit-comments.component';
import { DeleteCommentComponent } from '../delete-comment/delete-comment.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { FileUpload } from 'src/app/model/fileUpload.model';


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
  avatarUrl = 'http://localhost:5000/static/images/profile/'
  avatar: string = '';
  constructor(
    private commentsService:CommentsService,
    private dialog: MatDialog,
    private message: NzMessageService,
    private authService: AuthService

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
        console.log(data);
        
        if (data.message === "No yet commented on"){
          this.showMessageNotCommentsOn = true
        }else{
          this.comments = data
        }
      })
    }, 1000
    
    )
  }

  getAvatar(commentAvatar: any) {
      const avatarString = commentAvatar.replace(/'/g, '"');
      const avatarObj = JSON.parse(avatarString);
      if (avatarObj && typeof avatarObj === 'object' && avatarObj.imageServer) {
        this.avatar = `${this.avatarUrl}${avatarObj.imagePath}${avatarObj.imageExt}`;
      };
    return this.avatar;
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