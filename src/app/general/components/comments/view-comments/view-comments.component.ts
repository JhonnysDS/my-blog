import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/model/comment.model';
@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {
  comments: any = []

  @Input() postId: number = 2;

  constructor(
    private commentsService:CommentsService,

  ) { }

  ngOnInit(): void {
    this.getComments()
  }

  getComments(){
    // 
    setTimeout(()=>{
      this.commentsService.getCommentsById(this.postId)
      .subscribe(data => {  
        this.comments = data
      })
    }, 1000
    
    )
    
 
  }

}
