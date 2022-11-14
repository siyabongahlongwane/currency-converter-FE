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
  hide: boolean = false;
  showLogReg: boolean = false;
  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    role: new FormControl({
      id: 'GU',
      description: 'Generic User'
    }, [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    active: new FormControl( true ),
    priviledges: new FormControl({
      "canAdd": true,
      "canEdit": true,
      "canView": true,
      "canDelete": true,
      "canApprove": false,
      "canPublish": false
    }, [Validators.required])
  });

  constructor(private snackBar: MatSnackBar, private router: Router, private userService: UserService, private common: CommonService) { }

  ngOnInit(): void {
  }

  onSubmit(form: any): any {
    if (form.invalid) {
      this.common.openSnackbar('All fields are required');
      return false;
    } else {
      this.userService.login(`api/users/login?username=${form.value.username}&password=${form.value.password}`).subscribe(res => {
        this.common.openSnackbar(res?.msg);
        this.userService.saveSession(res?.user);
        ['SU', 'AD'].includes(res?.user?.role?.id) ? this.router.navigate(['admin/dashboard']) : this.router.navigate(['blog'])
      }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
    }
  }

  onSubmitReg(regForm: any): any {
    if (regForm.invalid) {
      this.common.openSnackbar('All fields are required');
      return false;
    } else {
      this.userService.addUser(`api/users/addUser`, regForm.value).subscribe(res => {
        this.common.openSnackbar(res?.msg);
        this.showLogReg = !this.showLogReg;
      }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
    }
  }

}
