import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../model/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(  
    private http: HttpClient
    ) { }

  getCommentsById(id: number){
    return this.http.get(`http://127.0.0.1:5000/posts/${id}/comments`)
  }

  createComment(id: number, comment: Comment){
    return this.http.post<Comment[]>(`http://127.0.0.1:5000/posts/${id}/comments`, comment)
  }

  deleteComment(id: number){
    return this.http.delete<Comment[]>(`http://127.0.0.1:5000/comments/${id}`)
  }


}
