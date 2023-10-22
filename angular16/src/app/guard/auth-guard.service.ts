import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { of, Observable, of as observableOf, BehaviorSubject } from "rxjs";
import { AuthService } from "../services/auth.service";
import { take, map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private acct: AccountService,) { }

  //  todos = this.acct.todos;
  // loginStatus = this.acct.loginStatus;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // this.singleTodo$ = this.acct.isLoggesIn.pipe(
    //   map(todos => todos.find(item => item.id === '1'))
    // );

    // if (!this.authService.isUserLoggedIn$.value) {
    //   this.router.navigate(["home"]);
    // }
    // return this.authService.isUserLoggedIn$;

    // return this.acct.isLoggesIn.pipe(
    //   take(1), 
    //   map((loginStatus? : boolean) => {
    //     if(!loginStatus) {
    //       this.router.navigate(['/login'], {queryParams: {returnUrl : state.url}});
    //       return false;
    //     }
    //   })
    // );

    if (this.authService.isUserLoggedIn$) {
      return true;
    } else {
      this.router.navigate(["home"]);
      return false;
    }
  }

  // canActivate(): Observable<boolean> {
  //   if (!this.authService.isUserLoggedIn$.value) {
  //     this.router.navigate(["home"]);
  //   }
  //   return this.authService.isUserLoggedIn$;
  // }
}
