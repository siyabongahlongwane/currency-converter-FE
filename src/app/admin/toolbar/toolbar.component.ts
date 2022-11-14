import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  spinner: boolean = false;
  skeleton: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  @Input() user: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    this.userService.destroySession();
    this.router.navigate(['login']);
  }

  reLoadPage() {
    window.location.reload();
  }

}
