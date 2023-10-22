import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject, Subject, of } from "rxjs";
import { first, catchError, tap, mapTo } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared.service';
import jwt_decode from "jwt-decode";
import { User } from "../model/User";
import { Tokens } from "../model/tokens";  //dev academy

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private apiurl = environment.API_URL;
  // public isAuthenticated$: boolean = false;
  // public menulist$: any;

  public isShowMenu = {
    isAdminRole: true,
    isTechnicRole: false,
    isStockRole: false
  }

  // state
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isUserRoleAdmin$ = new BehaviorSubject<boolean>(false);
  isUserRoleTechnic$ = new BehaviorSubject<boolean>(false);

  // get data-type from interface
  userId: Pick<User, "id">;
  userrole: Pick<User, "role">;
  userName: Pick<User, "name">;
  menuload: number = 0;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.apiurl}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("signup"))
      );
  }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  readonly USER_ROLE = 'USER_ROLE';
  tokenObject: {
    token: string;
    userId: Pick<User, "id">;
    userrole: Pick<User, "role">;
    username: Pick<User, "name">;
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{ token: string; userId: Pick<User, "id">; }> {
    console.log(`${this.apiurl}/login`,{ email, password },this.httpOptions);
    return this.http
      .post<any>(               // ต้นฉบับไม่มี <any> แต่ทีนีต้องใส่เพราะจะเกิด error
        `${this.apiurl}/login`,      // `${this.url}/login`, 
        { email, password },
        this.httpOptions
      )
      .pipe(
        first(), //tap((tokenObject: { token: string; userId: Pick<User, "id">; roleId: Pick<User, "role">;}) => {
        tap(tokenObject => {
          this.userId = tokenObject.userId;
          this.userrole = tokenObject.userrole;


          this.storeTokenObject(tokenObject);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['']);

          // this.isAuthenticated$ = true;
          // this.sharedService.userLogin = this.userrole;
          // this.LoadMenu();
          // this.DisplayMenu();  //ถ้าโหลดข้อมูลมาจากด้าต้าเบส จะใช้ฟังก์ชันนี

          // let tmp: any = this.userrole;
          // if (tmp == 'admin') {
          //   this.isUserRoleAdmin$.next(true);
          //   this.isUserRoleTechnic$.next(true);
          // };
          // this.isShowMenu.isTechnicRole = (tmp == 'technic') ? true : false;
          // this.isShowMenu.isStockRole = (tmp == 'stock') ? true : false;
          // console.log(this.isShowMenu);

          // console.log(tmp + ', isUserLoggedIn: ' + this.isUserLoggedIn$.value + ', isUserRoleAdmin: ' + this.isUserRoleAdmin$.value + ', isUserRoleTechnic: '+  this.isUserRoleTechnic$.value);
          // console.log('id:'+this.userId +', role:'+ this.roleId + ', token: '+ tokenObject.token);
        }),
        catchError(
          this.errorHandlerService.handleError<{ token: string; userId: Pick<User, "id">; }>("login")
        )
      );
  }

  private storeTokenObject(tokens: Tokens) {
    localStorage.setItem('token', tokens.token);
    localStorage.setItem('userrole', tokens.userrole);
    localStorage.setItem('username', tokens.username);
    localStorage.setItem('loginStatus', '1');
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.USER_ROLE, tokens.userrole);
  }
  tokenresp: any;

  private _updatemenu = new Subject<void>();
  get updatemenu() {
    return this._updatemenu;
  }

  logintype2(usercred: any) {
    return this.http.post(`${this.apiurl}/login`, usercred);
  }

  GetToken() {
    return localStorage.getItem("token") || '';
  }

  GetRolebyToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    // console.log(this.tokenresp);
    return this.tokenresp.role;
  }

  GetMenubyrole(role: any) {
    // console.log('GetMenubyrole: ' + role);
    // console.log(this.http.get(this.apiurl + '/getmenu/' + role));
    return this.http.get(this.apiurl + '/getmenu/' + role)
  }

  currentrole: any
  LoadMenu() {
    if (this.GetToken() != '') {
      this.currentrole = this.GetRolebyToken(this.GetToken());
      this.GetMenubyrole(this.currentrole).subscribe(result => {
        // console.log(result);
        // this.menulist$ = result;
      });
      // console.log(this.menulist$);
    }
  }

  DisplayMenu = async () => {
    if (this.GetToken() != '') {
      this.currentrole = await this.GetRolebyToken(this.GetToken());
      await this.GetMenubyrole(this.currentrole).subscribe(result => {
        // console.log(result);
        // this.menulist$ = result;
        // console.log(this.menulist$);
      });
    }
  }

  // from youtube: Fixing Logout issue when page refreshed - angular 7
  // แก้ไขปัญหา กดปุ่ม refres ทีหน้าเว็บแล้วเกิดการ logout

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<String>(localStorage.getItem('username') || '');
  private UserRole = new BehaviorSubject<String>(localStorage.getItem('userrole') || '');

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  // User related properties
  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    // localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_ROLE);
  }

  checkLoginStatus(): boolean {
    var loginCookie = localStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      return true;
    }
    return false;
  }

  /*--------------------------- start code from dev academy -------------------------*/
  // private readonly JWT_TOKEN = 'JWT_TOKEN';
  // private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // private readonly USER_ROLE = 'USER_ROLE';
  private loggedUser: string | null;

  login_Dev(user: { email: Pick<User, "email">, password: Pick<User, "password"> }): Observable<boolean> {
    return this.http.post<any>(`${this.apiurl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email.toString(), tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.USER_ROLE, tokens.userrole);
  }

  logout_Dev() {
    return this.http.post<any>(`${this.apiurl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${this.apiurl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  getUserRole() {
    return localStorage.getItem(this.USER_ROLE);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER_ROLE);
  }
  /*--------------------------- end code from dev academy -------------------------*/

  // checkLoginStatus(): boolean {
  //   var loginCookie = localStorage.getItem("loginStatus");

  //   if (loginCookie == "1") {
  //     if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
  //       return false;
  //     }

  //     // Get and Decode the Token
  //     const token = localStorage.getItem('token') || '';
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

  //   const helper = new JwtHelperService();
  //   const decodedToken = helper.decodeToken(myRawToken);
  //   // Other functions
  // const expirationDate = helper.getTokenExpirationDate(myRawToken);
  // const isExpired = helper.isTokenExpired(myRawToken);
}
