import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(): any {
    this.userService.checkRole('api/users/checkRole').subscribe(res => {
      if (res) return res;
      else {
        this.router.navigate(['login']);
        return false;
      }
    })
  }

  canActivateChild(): any {

    return ['AD', 'SU'].includes(JSON.parse(this.userService.checkSession())?.role?.id) ? true : false;
    // if(this.userService.checkSession()){
    //   const user = JSON.parse(this.userService.checkSession());
    //   if(['AD', 'SU'].includes(user.role.id)){
    //     return true;
    //   } else {
    //     return false
    //   }
    // }

    //   this.userService.checkRole('api/users/checkRole').subscribe(res => {
    //     if (res) return res;
    //     else {
    //       this.router.navigate(['login']);
    //       return false;
    //     }
    //   }, err => {
    //     this.router.navigate(['login']);
    //     return false;
    //   })

  }

}
