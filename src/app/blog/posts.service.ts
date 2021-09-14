import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
    private router: Router) { }

  // Define API
  apiURL = 'http://localhost:3000';




  addPost(data: Post)
    {
      console.log(data)
      this.http.post('http://localhost:3000/add', data)
        .subscribe((res: any) => {
          alert('Post Successfully Added.');
        })
  }

  deletePost(postId: string) {
    console.log(postId)
    this.http
      .delete('http://localhost:3000/delete/' + postId)
      .subscribe((data: any) => {
      });

  }

  // HttpClient API get() method => Fetch All Post
  getPosts(): Observable<Post> {
    return this.http.get<Post>(this.apiURL + '/getPost')

  }
}
