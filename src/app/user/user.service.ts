import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getPost(value: any) {
    throw new Error('Method not implemented.');
  }
  token: any[] | undefined;
  user!: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token
  }

 Login(value: any)
  {
    this.http.post('http://localhost:3000/login', value)
      .subscribe((res: any) => {
        this.token = res.data.token;
        this.user = res.data.user;
        console.log(this.token, this.user);
        if(this.user)
        {this.router.navigate(['posts']); }
      })
    }

    signup(userForm: User) {
      this.http.post('http://localhost:3000/signup', userForm)
      .subscribe((res: any) => {
        alert(res.Message)
      })
    }
    }
