import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  dashboardCards = [
    {
      icon: 'group',
      name: 'Active Users',
      class: 'greenBackground',
      color: 'greenColor',
      value: 0,
      route: '../users',
    },
    {
      icon: 'pending_actions',
      name: 'Pending Posts',
      class: 'blueBackground',
      color: 'blueColor',
      value: 0,
      route: '../posts',
    },
    {
      icon: 'comment',
      name: 'Review Comments',
      class: 'orangeBackground',
      color: 'orangeColor',
      value: 0,
      route: '../comments',
    },
    {
      icon: 'person_off',
      name: 'Inactive Users',
      class: 'redBackground',
      color: 'redColor',
      value: 0,
      route: '../users',
    },
  ];
  constructor(private userService: UserService, private common: CommonService, private postService: PostService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.getinActiveUsers();
    this.getActiveUsers();
    this.getUnPublishedPosts();
    this.getunPublishedComments()
  }

  getActiveUsers() {
    this.userService.getUsersCount('api/users/getUserCount?active=true').subscribe(res => {
      this.dashboardCards[0]['value'] = res?.count;
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  getinActiveUsers() {
    this.userService.getUsersCount('api/users/getUserCount?active=false').subscribe(res => {
      this.dashboardCards[3]['value']  = res?.count;
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  
  getUnPublishedPosts() {
    this.postService.getPostsCount('api/posts/getPostCount?published=false').subscribe(res => {
      this.dashboardCards[1]['value']  = res?.count;
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  getunPublishedComments() {
    this.commentService.getCommentsCount('api/comments/getCommentCount?published=false').subscribe(res => {
      this.dashboardCards[2]['value']  = res?.count;
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }


}
