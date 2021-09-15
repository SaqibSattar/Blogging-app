import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token
  }

 Login(value: any)
  {
    this.http.post('http://localhost:3000/login', value)
      .subscribe((res: any) => {
        this.token = res.token;
        console.log(this.token)
        this.user = res.id;
        console.log(res.id);
      })
    }

    signup(userForm: User) {
      this.http.post('http://localhost:3000/signup', userForm)
      .subscribe((res: any) => {
        alert(res.Message)
      })
    }
    }
