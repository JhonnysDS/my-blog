import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsService } from 'src/app/services/comments.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.scss']
})
export class DeleteCommentComponent implements OnInit {

  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  deleteComment(){
    this.commentsService.deleteComment(this.data.id)
    .subscribe(response => {
      location.reload()
    })
  }

}
