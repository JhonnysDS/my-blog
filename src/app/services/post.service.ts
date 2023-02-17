import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/post.model';
import { Subject } from 'rxjs';
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

  createPost(post: Post) {
    return this.http.post<Post[]>('http://localhost:5000/create-posts', post);
  }

  updatePost(id:number, title: string, content: string ){
    const body = { title: title, content: content };
    return this.http.put<Post[]>( `http://127.0.0.1:5000/posts/${id}`, body);
  }

  deletePost(id: number){
    return this.http.delete<any>(`http://127.0.0.1:5000/posts/${id}`)
  }


  //servicio para enviar la data de crear para loaging de mensaje
  private dataSource = new Subject<any>();
  data$ = this.dataSource.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }
  
}
