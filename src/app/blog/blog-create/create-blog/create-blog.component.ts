import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule, Validators } from "@angular/forms";
import { Post } from '../../post.model';
import { PostsService } from "../../posts.service";
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  userForm!: FormGroup;
  imageSrc: string = '';
  imageUrl: string = ''
  constructor(public formBuilder: FormBuilder, private post: PostsService) { }

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
    this.post.addPost(value)
  }
}
