import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';

const routes: Routes = [
  {
    path: '', component: ClientHomeComponent
  },
  {
    path: '**', component: ClientHomeComponent
  },
  {
    path: 'client/home', component: ClientHomeComponent
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
