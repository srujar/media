import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<UserData>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('user')));
  }

  login(data: UserData) {
    const URL: string = 'assets/data/userDetails.json';
    return this.http.get(URL).pipe(
      map((opData: any) => {
        let filteredData = opData.filter(eachUser => { return eachUser.password == data.password && eachUser.userid == data.userid });
        console.log("filteredData", filteredData);
        if (filteredData.length > 0) {
          this.setUser(filteredData[0]);
          return { success: true }
        } else {
          return { success: false, message: 'User not available', status: 'BAD REQUEST', }
        }
      })
    );
  }

  setUser(userData) {
    console.log("userData", userData);
    if (userData) this.currentUserSubject.next(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  public get currentUserValue(): UserData {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) this.currentUserSubject.next(user);
    return user;
  }

  logout() {
    this.router.navigate(['./'], { replaceUrl: true });
    this.currentUserSubject.next(null);
    localStorage.clear();
  }

}
