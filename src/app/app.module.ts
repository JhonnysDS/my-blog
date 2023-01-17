import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './general/components/postsc/posts/posts.component';
import { PostComponent } from './general/components/postsc/post/post.component';
import { CreatePostComponent } from './general/components/postsc/create-post/create-post.component';
import { RegisterComponent } from './general/components/auth/login/register/register.component';
import { LoginComponent } from './general/components/auth/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ViewCommentsComponent } from './general/components/comments/view-comments/view-comments.component';
import { CreateCommentsComponent } from './general/components/comments/create-comments/create-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    RegisterComponent,
    LoginComponent,
    ViewCommentsComponent,
    CreateCommentsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
