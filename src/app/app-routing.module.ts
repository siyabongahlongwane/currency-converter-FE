import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeClientComponent } from './home-client/home-client.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContainerComponent } from './admin/container/container.component';
import { AdminGuard } from './guards/admin.guard';
import { NewPostComponent } from './admin/new-post/new-post.component';
import { PostsComponent } from './admin/posts/posts.component';
import { LatestPostsComponent } from './admin/latest-posts/latest-posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'client/home', pathMatch: 'full' },
  { path: '', component: HomeClientComponent },
  // { path: '**', component: HomeClientComponent },
  { path: 'client/home', component: HomeClientComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: ContainerComponent, canLoad: [AdminGuard], canActivateChild: [AdminGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-post', component: NewPostComponent },
      { path: 'posts', component: LatestPostsComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
