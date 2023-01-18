import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/model/comment.model';
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

  ) {

   }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"));
    console.log(this.userId);

    
    this.getComments()

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
  deleteComment(id: number){
    if(this.confirmDelete()){
      this.commentsService.deleteComment(id)
      .subscribe(response => {
        location.reload();
        this.getComments()
      })
    } else {
      alert("No tienes permiso para eliminar este comentario")
    }
  }

}
