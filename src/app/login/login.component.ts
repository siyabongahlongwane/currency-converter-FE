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
  showLogReg: boolean = false;
  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private snackBar: MatSnackBar, private router: Router, private userService: UserService, private common: CommonService) { }

  ngOnInit(): void { }

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
}
