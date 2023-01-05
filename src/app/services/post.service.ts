import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPost(){
    return this.http.get<Post[]>('http://127.0.0.1:5000/posts')
  }

  getPost(id: number) {
    return this.http.get<Post>(`http://127.0.0.1:5000/posts/${id}`);
  
  }

}
