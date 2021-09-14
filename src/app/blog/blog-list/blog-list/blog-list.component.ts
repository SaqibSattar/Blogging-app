import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../post.model';
import { PostsService } from "../../posts.service";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

baseUrl = 'http://localhost:3000/';
  posts: Post[] = [];

  constructor(private postService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.loadPosts()
  }


  // Get Provider list
  loadPosts() {
  return this.postService.getPosts().subscribe((data: any) => {
    this.posts = data.Posts;
    console.log(this.posts);
  });
  }

  removePost(postId: string) {
    this.postService.deletePost(postId);
    alert('Post Successfully Deleted.');
    this.loadPosts();
 }
  // this.postService.removePost(id);
}
