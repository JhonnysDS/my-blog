import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './general/components/postsc/posts/posts.component';
import { PostComponent } from './general/components/postsc/post/post.component';
import { CreatePostComponent } from './general/components/postsc/create-post/create-post.component';
import { RegisterComponent } from './general/components/auth/register/register.component';
import { LoginComponent } from './general/components/auth/login/login.component';
import { EditCommentsComponent } from './general/components/comments/edit-comments/edit-comments.component';

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
  },
  {
    path: 'comment/:id',
    component: EditCommentsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
