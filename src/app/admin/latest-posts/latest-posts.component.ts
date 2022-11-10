import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NewPostComponent } from '../new-post/new-post.component';


@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit {
  img: string = '../../assets/img/cookie.png';
  displayedColumns: string[] = ['photos', 'title', 'category', 'content', 'createdBy', 'createdAt', 'published', 'action'];
  user: any = {};
  dataSource = new MatTableDataSource([]);
  constructor(private router: Router, private userService: UserService, private postService: PostService, private common: CommonService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(`api/posts/getPosts?role=${this.user?.role?.id}&username=${this.user?.username}`).subscribe(res => {
      this.dataSource = new MatTableDataSource(res?.posts);
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, item: any) {
    if (action === 'view') {
      this.dialog.open(NewPostComponent, { data: { item, disableInputs: true, action }, disableClose: true });
    } else if (action === 'edit') {
      this.dialog.open(NewPostComponent, { data: { item, disableInputs: false, action, disableClose: true } }).afterClosed().subscribe(updatedRecord => {
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
    this.postService.deletePost(`api/posts/deletePost/${id}`).subscribe(res => {
      this.common.openSnackbar(res?.msg);
      this.getPosts();
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  updateRecord(body: any) {
    this.postService.updatePost(`api/posts/updatePost/${body['_id']}`, body).subscribe(res => {
      this.common.openSnackbar(res?.msg);
      this.getPosts();
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }
}
