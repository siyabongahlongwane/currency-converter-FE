import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonService } from '../services/common.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  user: any = {};
  posts: any = [];

  constructor(private userService: UserService, private postService: PostService, private common: CommonService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.checkSession());
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(`api/posts/getPosts?role=${this.user?.role?.id}&username=${this.user?.username}`).subscribe(res => {
      this.posts = res.posts;
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  sanitizeImg(img: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(img);
  }
}
