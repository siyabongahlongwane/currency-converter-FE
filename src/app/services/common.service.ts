import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackbar: MatSnackBar) { }

  checkCookie(): any{
    return JSON.parse(localStorage.getItem('cookie') || 'null');
  }

  storeCookie(cookie: boolean){
    localStorage.setItem('cookie', JSON.stringify(cookie));
  }

  openSnackbar(msg: string){
    this.snackbar.open(msg, 'Close', {duration: 4000});
  }
}
