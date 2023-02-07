import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {

  constructor(
    private postService:PostService,
    private dialog:MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
  }


  deletePost(){
    this.postService.deletePost(this.data.id)
    .subscribe(response => {
      localStorage.setItem('postDeleted', 'success');
      location.reload()
    })
  }

}
