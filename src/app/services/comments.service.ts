import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
