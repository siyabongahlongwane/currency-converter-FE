import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { ContactComponent } from './contact/contact.component';
import { CookiesDialogComponent } from './cookies-dialog/cookies-dialog.component';
import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContainerComponent } from './admin/container/container.component';
import { ToolbarComponent } from './admin/toolbar/toolbar.component';
import { LatestPostsComponent } from './admin/latest-posts/latest-posts.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewPostComponent } from './admin/new-post/new-post.component';
import { PostsComponent } from './admin/posts/posts.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { CommentsComponent } from './admin/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeClientComponent,
    ContactComponent,
    CookiesDialogComponent,
    TermsDialogComponent,
    PrivacyDialogComponent,
    LoginComponent,
    DashboardComponent,
    ContainerComponent,
    ToolbarComponent,
    LatestPostsComponent,
    NewPostComponent,
    PostsComponent,
    UsersComponent,
    AdminProfileComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
