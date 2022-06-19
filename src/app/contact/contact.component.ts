import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: any = [{
    name: null,
    email: null,
    message: null,
  }];

  inputs: any[] = [
    {
      label: 'Name',
      required: true,
      type: 'text',
      name: 'name',
      binding: this.contact.name,
      placeholder: 'Enter Name',
    },
    {
      label: 'Email',
      required: true,
      type: 'email',
      name: 'email',
      binding: this.contact.email,
      placeholder: 'Enter Email',
    },
    {
      label: 'Message',
      required: true,
      type: 'textarea',
      name: 'message',
      binding: this.contact.message,
      placeholder: 'Enter Message',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
