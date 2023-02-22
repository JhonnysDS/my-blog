import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './general/components/postsc/posts/posts.component';
import { PostComponent } from './general/components/postsc/post/post.component';
import { CreatePostComponent } from './general/components/postsc/create-post/create-post.component';
import { RegisterComponent } from './general/components/auth/register/register.component';
import { LoginComponent } from './general/components/auth/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ViewCommentsComponent } from './general/components/comments/view-comments/view-comments.component';
import { CreateCommentsComponent } from './general/components/comments/create-comments/create-comments.component';
import { EditCommentsComponent } from './general/components/comments/edit-comments/edit-comments.component';
import { EditPostComponent } from './general/components/postsc/edit-post/edit-post.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DeleteCommentComponent } from './general/components/comments/delete-comment/delete-comment.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DeletePostComponent } from './general/components/postsc/delete-post/delete-post.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PageNotFoundComponent } from './general/errors/page-not-found/page-not-found.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ServerErrorComponent } from './general/errors/server-error/server-error.component';
import { HttpErrorInterceptor } from './general/errors/interceptors/http-error.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserComponent } from './general/components/auth/user/user.component';

registerLocaleData(es);
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
    EditCommentsComponent,
    EditPostComponent,
    SidenavComponent,
    DeleteCommentComponent,
    DeletePostComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    UserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NzMessageModule,
    NzAlertModule,
    NzCommentModule,
    NzIconModule,
    NzResultModule,
    NzButtonModule,
    NgxPaginationModule

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
               { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
               { provide: NZ_I18N, useValue: es_ES },],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
