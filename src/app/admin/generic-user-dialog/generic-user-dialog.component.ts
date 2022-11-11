import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-generic-user-dialog',
  templateUrl: './generic-user-dialog.component.html',
  styleUrls: ['./generic-user-dialog.component.scss']
})
export class GenericUserDialogComponent implements OnInit {
  hide: boolean = false;
  roles: any = [
    {
      id: "GU",
      description: "Generic User"
    },
    {
      id: "AD",
      description: "Admin"
    },
    {
      id: "SU",
      description: "Super User"
    },
  ]

  register: any = {};

  constructor(private router: Router, private userService: UserService, private common: CommonService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.createForm();
  }


  ngOnInit(): void {
    if (this.data && this.data.action == 'view') {
      this.disableForm();
    } else if (this.data && this.data.action == 'edit') {
      this.prepopulateForm();
    }
  }

  // onSubmitReg(regForm: any): any {
  //   if (regForm.invalid) {
  //     this.common.openSnackbar('All fields are required');
  //     return false;
  //   } else {
  //     this.userService.addUser(`api/users/addUser`, regForm.value).subscribe(res => {
  //       this.common.openSnackbar(res?.msg);
  //     }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  //   }
  // }

  disableForm() {
    this.prepopulateForm();
    this.register.disable();
  }

  prepopulateForm() {
    this.register.patchValue(this.data.item);
  }

  createForm() {
    this.register = this.fb.group({
      firstName: ['', Validators['required']],
      lastName: ['', Validators['required']],
      role: ['', Validators['required']],
      username: ['', Validators['required']],
      password: ['', Validators['required']],
      privileges: this.fb.group({
        canAdd: [false, Validators['required']],
        canEdit: [false, Validators['required']],
        canView: [false, Validators['required']],
        canDelete: [false, Validators['required']],
        canApprove: [false, Validators['required']],
        canPublish: [false, Validators['required']]
      })
    })
  }
}
