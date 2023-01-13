import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './general/components/posts/posts.component';
import { PostComponent } from './general/components/post/post.component';
import { CreatePostComponent } from './general/components/create-post/create-post.component';
import { RegisterComponent } from './general/components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
