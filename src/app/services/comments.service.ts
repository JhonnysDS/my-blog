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
    return this.http.get<any>(`http://127.0.0.1:5000/posts/${id}/comments`)
  }

  getComment(id: number){
    return this.http.get<any>(`http://127.0.0.1:5000/comments/${id}`)

  }

  createComment(id: number, comment: Comment){
    return this.http.post<any>(`http://127.0.0.1:5000/posts/${id}/comments`, comment)
  }

  editComment(id: number, comment: Comment){
    return this.http.put<Comment[]>(`http://127.0.0.1:5000/comments/${id}`, comment)
  }

  deleteComment(id: number){
    return this.http.delete<Comment[]>(`http://127.0.0.1:5000/comments/${id}`)
  }

    //servicio para enviar la data de crear para loaging de mensaje
    private dataSource = new Subject<any>();
    data$ = this.dataSource.asObservable();
  
    sendData(data: any) {
      this.dataSource.next(data);
    }

}
