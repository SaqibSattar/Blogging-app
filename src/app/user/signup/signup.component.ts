import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient,
    private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  submit(){
    console.log(this.userForm.value)
    this.userService.signup(this.userForm.value);
    setTimeout(() => {
      this.router.navigate(['login'])
    }, 1000);
}
}
