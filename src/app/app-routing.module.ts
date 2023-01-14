import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './general/components/posts/posts.component';
import { PostComponent } from './general/components/post/post.component';
import { CreatePostComponent } from './general/components/create-post/create-post.component';
import { RegisterComponent } from './general/components/register/register.component';
import { LoginComponent } from './general/components/login/login.component';


const routes: Routes = [
  { path: '', 
  redirectTo: 'posts', 
  pathMatch: 'full' },
  {
    path: 'posts', 
    component: PostsComponent
  },
  {
    path: 'post/:id', 
    component: PostComponent
  },

  {
    path: 'create-post',
    component: CreatePostComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
