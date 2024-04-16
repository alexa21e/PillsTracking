import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7137/api/account/'

  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,
    private router: Router) { }

  loadCurrentUser(token: string | null) {
    if(token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(this.baseUrl, { headers }).pipe(
      map((user) => {
        if(user){
          this.currentUserSource.next(user);
          return user;
        }
        else{
          return null;
        }
      }));
  }

  getCurrentUser() {
    return this.http.get<User>(this.baseUrl);
  }

  login(values: any) {
    return this.http.post<User>(this.baseUrl + 'login', values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    );
  }

  registerAdmin(values: any){
    return this.http.post<User>(this.baseUrl + 'register/admin', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    )
  }

  registerDoctor(values: any){
    return this.http.post<User>(this.baseUrl + 'register/doctor', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
