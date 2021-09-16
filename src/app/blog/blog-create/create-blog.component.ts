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
  imageData!: string;
  author!: string;


  constructor(public formBuilder: FormBuilder, private post: PostsService,
    private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      image: [null, [Validators.required]],

    });
  }

  onFileSelect(event: Event) {
    var check = event.target as HTMLInputElement;
    var check2 = check.files;
    var tempArray = Array.prototype.slice.call(check2);
    console.log(tempArray[0]);
   const file = tempArray[0];

   this.userForm.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
   if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
     reader.readAsDataURL(file);
    }
}

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
  }

    console.log(value)
  }
}
