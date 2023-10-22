import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';

export interface Todo {
  id?: any;
  createdAt?: number;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // Need HttpClient to communicate over HTTP with Web API
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Url to access our Web API’s
  // private baseUrlLogin: string = "/api/account/login";
  // private baseUrlRegister: string = "/api/account/register";
  private apiurl = environment.API_URL;

  // User related properties
  private _todos = new BehaviorSubject<Todo[]>([]);
  private dataStore: { todos: Todo[] } = { todos: [] };
  readonly todos = this._todos.asObservable();

  readonly loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username') || '');
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userrole') || '');

  // Register Method return
  // register(username: string, password: string, email: string) {
  //   return this.http.post<any>(this.baseUrlRegister, { username, password, email }).pipe(
  //     map(result => {
  //       //registration was successful
  //       return result;
  //     },
  //       // error => { return error; }
  //     ),
  //     catchError(
  //       this.errorHandlerService.handleError<{ token: string; userId: "suer"; }>("login")
  //     )
  //   );
  // }

  //Login Method
  login(usercred: any) {
    // pipe() let you combine multiple functions into a single function. 
    // pipe() runs the composed functions in sequence.
    return this.http.post<any>(`${this.apiurl}/login`, usercred).pipe(
      map(result => {
        // login successful if there's a jwt token in the response
        if (result && result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('userrole', result.userrole);
          // localStorage.setItem('expiration', result.expiration);
          this.UserName.next(localStorage.getItem('username') || '');
          this.UserRole.next(localStorage.getItem('userrole') || '');
        }
        return result;
      })
    );
  }

  logout() {
    // Set Loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    // localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged Out Successfully");

  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      return true;
    }
    return false;
  }

  // checkLoginStatus(): boolean {
  //   var loginCookie = localStorage.getItem("loginStatus");

  //   if (loginCookie == "1") {
  //     if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
  //       return false;
  //     }

  //     // Get and Decode the Token
  //     const token = localStorage.getItem('jwt') || '';
  //     const decoded = this.getDecodedAccessToken(token);
  //     // Check if the cookie is valid

  //     if (decoded.exp === undefined) {
  //       return false;
  //     }

  //     // Get Current Date Time
  //     const date = new Date(0);

  //     // Convert EXp Time to UTC
  //     let tokenExpDate = date.setUTCSeconds(decoded.exp);

  //     // If Value of Token time greter than 
  //     if (tokenExpDate.valueOf() > new Date().valueOf()) {
  //       return true;
  //     }
  //     console.log("NEW DATE " + new Date().valueOf());
  //     console.log("Token DATE " + tokenExpDate.valueOf());
  //     return false;
  //   }
  //   return false;
  // }



  get isLoggesIn() : Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }



}
