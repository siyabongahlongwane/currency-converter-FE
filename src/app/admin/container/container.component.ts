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
      name: 'Home',
      class: 'whiteColor',
      route: 'home',
    },
    {
      icon: 'account_circle',
      name: 'Profile',
      class: 'whiteColor',
      route: 'profile',
    },
    {
      icon: 'groups',
      name: 'Clients',
      class: 'whiteColor',
      route: 'clients',
    },
    {
      icon: 'event',
      name: 'Booking Requests',
      class: 'whiteColor',
      route: 'bookingRequests',
    },
    {
      icon: 'apartment',
      name: 'Reservations',
      class: 'whiteColor',
      route: 'reservations',
    },
    {
      icon: 'paid',
      name: 'Invoices',
      class: 'whiteColor',
      route: 'invoices',
    },
    {
      icon: 'emoji_events',
      name: 'Rewards',
      class: 'whiteColor',
      route: 'rewards',
    },
    // {
    //   icon: 'emoji_events',
    //   name: 'Appointments',
    //   class: 'whiteColor',
    //   route: 'appointments',
    // },
  ];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
  }

  logout() {
    this.userService.destroySession();
    this.router.navigate(['login']);
  }
}
