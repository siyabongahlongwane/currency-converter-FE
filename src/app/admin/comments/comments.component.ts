import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  img: string = '../../assets/img/cookie.png';
  displayedColumns: string[] = ['content', 'createdBy', 'createdAt', 'published', 'modifiedBy', 'modifiedAt', 'action'];
  user: any = {};
  dataSource = new MatTableDataSource([]);
  constructor(private router: Router, private userService: UserService, private postService: PostService, private common: CommonService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(`api/posts/getPosts?role=${this.user?.role?.id}&username=${this.user?.username}`).subscribe(res => {
      // res.posts = []
      this.dataSource = new MatTableDataSource(res?.posts);
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, item: any){

  }
}
