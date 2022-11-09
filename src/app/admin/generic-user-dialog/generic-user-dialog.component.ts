import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  register = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    role: new FormControl({}, [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    canAdd: new FormControl(false, [Validators.required]),
    canEdit: new FormControl(false, [Validators.required]),
    canView: new FormControl(false, [Validators.required]),
    canDelete: new FormControl(false, [Validators.required]),
    canApprove: new FormControl(false, [Validators.required]),
    canPublish: new FormControl(false, [Validators.required]),
  });

  constructor(private router: Router, private userService: UserService, private common: CommonService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    if (this.data && this.data.action == 'view') {
      this.disableForm();
    } else if (this.data && this.data.action == 'edit') {

      this.prepopulateForm();
    }
  }

  onSubmitReg(regForm: any): any {
    if (regForm.invalid) {
      this.common.openSnackbar('All fields are required');
      return false;
    } else {
      regForm.value['privileges'] = {
        "canAdd": regForm.value.canAdd,
        "canEdit": regForm.value.canEdit,
        "canView": regForm.value.canView,
        "canDelete": regForm.value.canDelete,
        "canApprove": regForm.value.canApprove,
        "canPublish": regForm.value.canPublish,
      }

      delete regForm.value.canAdd;
      delete regForm.value.canEdit;
      delete regForm.value.canView;
      delete regForm.value.canDelete;
      delete regForm.value.canApprove;
      delete regForm.value.canPublish;
      this.userService.addUser(`api/users/addUser`, regForm.value).subscribe(res => {
        this.common.openSnackbar(res?.msg);

      }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
    }
  }

  disableForm() {
    this.prepopulateForm();
    this.register.disable();
  }

  prepopulateForm() {
    this.register.value.canAdd =  this.data.item.canAdd;
    this.register.value.canEdit =  this.data.item.canEdit;
    this.register.value.canView =  this.data.item.canView;
    this.register.value.canDelete =  this.data.item.canDelete;
    this.register.value.canApprove =  this.data.item.canApprove;
    this.register.value.canPublish =  this.data.item.canPublish;
    this.register.patchValue(this.data.item);
  }
}
