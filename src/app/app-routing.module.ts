import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './blog/blog-create/create-blog/create-blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list/blog-list.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  {path : '' , redirectTo : '/home' , pathMatch : 'full'},
  {
    path: 'home',component: CreateBlogComponent},
    {path: 'posts', component: BlogListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '**' ,redirectTo:'/home'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
