import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() loginClicked = new EventEmitter();
  logoutLink: boolean = false;
  userData: UserData = null;
  constructor(
    private authService: AuthService,
    private alertService: AlertDialogService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(userData => {
      if (userData) {
        this.logoutLink = true;
        this.userData = userData;
      } else {
        this.logoutLink = false;
      }
    })
  }

  logout() {
    this.alertService.confirm('Login', `You have successfully logged Out`, 'OK', 'sm');
    this.authService.logout();
  }



}
