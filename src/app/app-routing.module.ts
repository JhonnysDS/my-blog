import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './general/components/postsc/posts/posts.component';
import { PostComponent } from './general/components/postsc/post/post.component';
import { RegisterComponent } from './general/components/auth/register/register.component';
import { LoginComponent } from './general/components/auth/login/login.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
const routes: Routes = [
  { path: '', 
  redirectTo: 'posts', 
  pathMatch: 'full' },
  {
    path: 'posts', 
    component: PostsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'post/:id', 
    component: PostComponent,
    // canActivate: [AuthGuardGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
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
