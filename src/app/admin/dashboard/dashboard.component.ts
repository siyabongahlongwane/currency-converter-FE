import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardCards = [
    {
      icon: 'group',
      name: 'Active Users',
      class: 'greenBackground',
      color: 'greenColor',
      value: 0,
      route: '../clients',
    },
    {
      icon: 'pending_actions',
      name: 'Pending Posts',
      class: 'blueBackground',
      color: 'blueColor',
      value: 0,
      route: '../appointments',
    },
    {
      icon: 'comment',
      name: 'Review Comments',
      class: 'orangeBackground',
      color: 'orangeColor',
      value: 0,
      route: '../reservations',
    },
    {
      icon: 'person_off',
      name: 'Deleted Users',
      class: 'redBackground',
      color: 'redColor',
      value: 0,
      route: '../invoices',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
