import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token= '';

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token
  }

 Login(value: any)
  {
    this.http.post<{token: string}>('http://localhost:3000/login', value)
      .subscribe((res: any) => {
        console.log(res.token);
        this.token = res.token;
        console.log(this.token)

      })
    }

    signup(userForm: User) {
      this.http.post('http://localhost:3000/signup', userForm)
      .subscribe((res: any) => {
        alert(res.Message)
      })
    }
    }
