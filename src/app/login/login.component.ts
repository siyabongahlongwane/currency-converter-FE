import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showLogReg: boolean = false;
  login = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(login: any) {
    if ( !login.username.includes('@gmail.com') ) {
      this.snackBar.open('Invalid Username, include( @gmail.com )', 'Ok');
    }else{
      this.router.navigate(['/client/home']);
      this.snackBar.open('Logged in Succefully', 'Ok');
    }
    console.log(this.login);
  }
}
