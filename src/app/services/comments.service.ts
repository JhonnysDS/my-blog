import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../model/comment.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public commentEdited = new Subject<any>();


  constructor(  
    private http: HttpClient
    ) { }

  getCommentsById(id: number){
    return this.http.get(`http://127.0.0.1:5000/posts/${id}/comments`)
  }

  getComment(id: number){
    return this.http.get<Comment[]>(`http://127.0.0.1:5000/comments/${id}`)

  }

  createComment(id: number, comment: Comment){
    return this.http.post<Comment[]>(`http://127.0.0.1:5000/posts/${id}/comments`, comment)
  }

  editComment(id: number, comment: Comment){
    return this.http.put<Comment[]>(`http://127.0.0.1:5000/comments/${id}`, comment)
  }

  deleteComment(id: number){
    return this.http.delete<Comment[]>(`http://127.0.0.1:5000/comments/${id}`)
  }


}
