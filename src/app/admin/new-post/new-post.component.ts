import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  apiKey = "qfwy5z014a4hcnov7czl3rqg10913vktki5rxha12hz66ywl";
  img: string = '../../assets/img/cookie.png';
  author: any = {};
  categories: string[] = ['Crypto', 'Exchange Rates', 'Financial', 'Educational'];
  newPost: any = {};
  constructor(private userService: UserService, private postService: PostService, private common: CommonService, private router: Router) {
    this.createPostForm();
  }

  ngOnInit(): void {
  }

  createPost(form: FormGroup) {
    if(form.invalid) return false;
    return this.postService.addPost(`api/posts/addPost`, form.value).subscribe(res => {
      this.common.openSnackbar(res?.msg);
    }, onFailure => this.common.openSnackbar(onFailure?.error?.msg || 'Internal Server Error'));
  }

  createPostForm(){
    this.author = JSON.parse(this.userService.checkSession());
    this.author['name'] = `${this.author.firstName} ${this.author.lastName}`;
    this.newPost = new FormGroup({
      "title": new FormControl('', [Validators.required]),
      "category": new FormControl('', [Validators.required]),
      "photos": new FormControl([this.img], [Validators.required]),
      "createdBy": new FormControl(this.author.name, [Validators.required]),
      "createdAt": new FormControl(new Date(), [Validators.required]),
      "published": new FormControl(false, [Validators.required]),
      "modifiedBy": new FormControl(''),
      "modifiedAt": new FormControl(''),
      "content": new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      "owner": new FormControl(this.author['username'])
    });
  }
}