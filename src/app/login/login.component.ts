import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // getRole: string = '';
  showLogReg: boolean = false;
  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]),
    lastName: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]),
    email: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private snackBar: MatSnackBar, private router: Router, private userService: UserService, private common: CommonService) { }

  ngOnInit(): void { 
    // this.getRole = sessionStorage.getItem('user')
  }

  onSubmit(form: any): any {
    if (form.invalid) {
      this.snackBar.open('Invalid Username', 'Dismiss');
      return false;
    } else {
      this.userService.login(`api/users/login?username=${form.value.username}&password=${form.value.password}`).subscribe(res => {
        this.common.openSnackbar(res?.msg);
        this.userService.saveSession(res?.user);
        this.router.navigate(['admin/dashboard']);
      }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
    }
  }

  onSubmitRe(regForm: any): any {
    if (regForm.invalid) {
      this.snackBar.open('Invalid Username', 'Dismiss');
      return false;
    } else {
      console.log("Hi", regForm)
      // this.userService.login(`api/users/login?username=${form.value.username}&password=${form.value.password}`).subscribe(res => {
      //   this.common.openSnackbar(res?.msg);
      //   this.userService.saveSession(res?.user);
      //   this.router.navigate(['admin/dashboard']);
      // }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
    }
  }

}
