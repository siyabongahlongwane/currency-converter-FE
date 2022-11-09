import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { GenericUserDialogComponent } from '../generic-user-dialog/generic-user-dialog.component';
import { NewPostComponent } from '../new-post/new-post.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  img: string = '../../assets/img/cookie.png';
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'role', 'action'];
  user: any = {};
  dataSource = new MatTableDataSource([]);
  constructor(private router: Router, private userService: UserService, private common: CommonService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(`api/users/getUsers`).subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, item: any) {
    if (action === 'view') {
      this.dialog.open(GenericUserDialogComponent, { data: { item, disableInputs: true, action }, disableClose: true });
    } else if (action === 'edit') {
      this.dialog.open(GenericUserDialogComponent, { data: { item, disableInputs: false, action, disableClose: true } }).afterClosed().subscribe(updatedRecord => {
        if (updatedRecord) {
          updatedRecord['_id'] = item['_id'];
          this.updateRecord(updatedRecord)
        }
      })
    } else {
      this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirmDelete => {
        if (confirmDelete) {
          this.deleteRecord(item['_id']);
        }
      })
    }
  }

  deleteRecord(id: string) {
    this.userService.deleteUser(`api/users/deleteUser/${id}`).subscribe(res => {
      this.common.openSnackbar(res?.msg);
      this.getUsers();
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  updateRecord(body: any) {
    this.userService.updateUser(`api/users/updateUser/${body['_id']}`, body).subscribe(res => {
      this.common.openSnackbar(res?.msg);
      this.getUsers();
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  addUser(body: any) {
    this.userService.addUser(`api/users/addUser`, body).subscribe(res => {
      this.common.openSnackbar(res?.msg);
      this.getUsers();
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  openNewUserDialog() {
    this.dialog.open(GenericUserDialogComponent).afterClosed().subscribe(user => {
      if (user) {
        this.addUser(user)
      }
    })
  }
}
