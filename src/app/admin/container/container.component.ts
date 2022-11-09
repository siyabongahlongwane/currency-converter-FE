import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  spinner: boolean = false;
  skeleton: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  showFiller = false;
  user: any = {};
  sidenavItems: any[] = [
    {
      icon: 'home',
      name: 'Dashboard',
      class: 'whiteColor',
      route: 'dashboard',
    },
    {
      icon: 'account_circle',
      name: 'Profile',
      class: 'whiteColor',
      route: 'profile',
    },
    {
      icon: 'groups',
      name: 'Users',
      class: 'whiteColor',
      route: 'users',
    },
    {
      icon: 'event',
      name: 'Posts',
      class: 'whiteColor',
      route: 'posts',
    },
    {
      icon: 'comments',
      name: 'Comments',
      class: 'whiteColor',
      route: 'comments',
    }
  ];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
  }
}
