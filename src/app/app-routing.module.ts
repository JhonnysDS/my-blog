import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './general/components/postsc/posts/posts.component';
import { PostComponent } from './general/components/postsc/post/post.component';
import { RegisterComponent } from './general/components/auth/register/register.component';
import { LoginComponent } from './general/components/auth/login/login.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { PageNotFoundComponent } from './general/errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './general/errors/server-error/server-error.component';
import { UserComponent } from './general/components/user/user/user.component';
import { ForgotPasswordComponent } from './general/components/auth/forgot-password/forgot-password.component';
const routes: Routes = [
  { path: '', 
  redirectTo: 'posts', 
  pathMatch: 'full' },
  {
    path: 'posts', 
    component: PostsComponent,
  },
  {
    path: 'post/:id', 
    component: PostComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserComponent
  },
  {
    path: 'password/forgot',
    component: ForgotPasswordComponent
  },
  { 
    path: 'server-error', 
    component:ServerErrorComponent 
},
  { 
    path: '**', 
  component: PageNotFoundComponent
 },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
