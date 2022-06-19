import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeClientComponent } from './home-client/home-client.component';

const routes: Routes = [
  {
    path: '', component: HomeClientComponent
  },
  {
    path: '**', component: HomeClientComponent
  },
  {
    path: 'client/home', component: HomeClientComponent
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
