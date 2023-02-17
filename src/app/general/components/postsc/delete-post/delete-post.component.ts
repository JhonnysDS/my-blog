import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {

  constructor(
    private postService:PostService,
    private dialog:MatDialog,
    private message: NzMessageService,


    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
  }


  deletePost(){
    this.postService.deletePost(this.data.id)
    .subscribe({
      next: response => {
        localStorage.setItem('postDeleted', 'success');
        this.postService.sendData('success');
        location.reload();
      },
      error: err => {
       this.messageDeletePostFailed()
        // Puedes mostrar el mensaje de error al usuario de la forma que desees, por ejemplo:

      }
    });
  
  }

  messageDeletePostFailed(): void {
    this.message
      .error('Parece que no tienes permisos para eliminar este Post!', { nzDuration: 3000 })
  }


}
