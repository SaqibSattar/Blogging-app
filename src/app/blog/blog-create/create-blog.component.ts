import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule, Validators } from "@angular/forms";
import { Post } from '../post.model';
import { PostsService } from "../posts.service";

import { UserService } from "../../user/user.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  userForm!: FormGroup;
  imageSrc: string = '';
  imageUrl: string = ''
  author!: string;
  constructor(public formBuilder: FormBuilder, private post: PostsService,
    private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: ['', [Validators.required]],

    })
  }

  onFileChange(event:any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.userForm.patchValue({
          fileSource: reader.result
        });

      };
}  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  submit(value: Post)
  {
    this.author = this.userService.user
    if(this.author)
    {
      value['author'] = this.author;
      this.post.addPost(value);
      setTimeout(() => {
        this.router.navigate(['myposts'])
      }, 1000);
    }
    else {
    alert('Please login before uploading blog');
    this.router.navigate(['login']);
  } //console.log(value + this.author)

    console.log(value)
  }
}
