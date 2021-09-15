import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../blog/post.model';
import { UserService } from "../user/user.service";
import { MypostsService } from './myposts.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router, private mypostService: MypostsService) { }

  user!: string;
  posts!: any;
  baseUrl = 'http://localhost:3000/'

  ngOnInit(): void {
    this.user = this.userService.user;
    this.loadMyPost()
  }


  loadMyPost()
  {
    if(this.user)
    {
      this.mypostService.getBlogs(this.user).subscribe((data: any) =>
      {
        this.posts = data.doc;
      });
    }
    else {
    alert('Please login for your Blogs');
    this.router.navigate(['login']);
        }
}

removePost(postId: string) {
  this.mypostService.deletePost(postId);
  alert('Post Successfully Deleted.');
  this.loadMyPost();
}

}
