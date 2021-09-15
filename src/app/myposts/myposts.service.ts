import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../blog/post.model';


@Injectable({
  providedIn: 'root'
})
export class MypostsService {
  posts: any;

  constructor(private http: HttpClient) { }

  getBlogs(userId: string) {
   return this.http.get('http://localhost:3000/' + userId)
 }

 deletePost(postId: string) {
  this.http
    .delete('http://localhost:3000/delete/' + postId)
    .subscribe((data: any) => {
    });

}

}
