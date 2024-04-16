import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { AccountService } from "../../shared/services/account.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private accountService: AccountService,
    private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const expectedRole = route.data['role'];
    const user = await firstValueFrom(this.accountService.currentUser$);

    if (user && user.role === expectedRole) {
      return true;
    } else if (user && user.role === 'Admin') {
      return this.router.parseUrl('/admin');
    } else if (user && user.role === 'Doctor') {
      return this.router.parseUrl('/doctor');
    } else {
      this.router.navigate([''], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}