import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  formCreate = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  constructor(
    private postService:PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
  }

  onSubmit(form: any){
    this.postService.createPost(form)
      .subscribe(data => {
        location.reload()
    })
  }


}
