import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl +'api/account/'

  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  private currentUserRoleSource = new BehaviorSubject<string | null>(null);
  currentUserRole$ = this.currentUserRoleSource.asObservable();
  
  private currentUserEmailSource = new BehaviorSubject<string | null>(null);
  currentUserEmail$ = this.currentUserEmailSource.asObservable();

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
          this.currentUserRoleSource.next(user.role);
          this.currentUserEmailSource.next(user.email);
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
        this.currentUserRoleSource.next(user.role);
        this.currentUserEmailSource.next(user.email);
        return user;
      })
    );
  }

  registerAdmin(values: any){
    return this.http.post<User>(this.baseUrl + 'register/admin', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        this.currentUserRoleSource.next(user.role);
        this.currentUserEmailSource.next(user.email);
        return user;
      })
    )
  }

  registerDoctor(values: any){
    return this.http.post<User>(this.baseUrl + 'register/doctor', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        this.currentUserRoleSource.next(user.role);
        this.currentUserEmailSource.next(user.email);
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.currentUserRoleSource.next(null);
    this.currentUserEmailSource.next(null);
    this.router.navigateByUrl('/');
  }

  redirectBasedOnRole(user: User) {
    if (user.role === 'Admin') {
      this.router.navigate(['/admin']);
    } else if (user.role === 'Doctor') {
      this.router.navigate(['/doctor']);
    }
  }
}
