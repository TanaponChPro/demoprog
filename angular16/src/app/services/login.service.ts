import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiurl = environment.API_URL;
  
  constructor(private http: HttpClient, private router: Router) { }

  tokenresp: any;
  private _updatemenu = new Subject<void>();
  get updatemenu() {
    return this._updatemenu;
  }

  Proceddlogin(usercred: any) {
    return this.http.post(this.apiurl + 'authenticate', usercred);
  }

  GenerateRefreshToken() {
    let input = {
      "jwtToken": this.GetToken(),
      "refreshToken": this.GetRefreshToken()
    }
    return this.http.post(this.apiurl + 'refresh', input);
  }

  IsLogged() {
    return localStorage.getItem("token") != null;
  }
  GetToken() {
    return localStorage.getItem("token") || '';
  }
  GetRefreshToken() {
    return localStorage.getItem("refreshtoken") || '';
  }

  SaveTokens(tokendata: any) {
    localStorage.setItem('token', tokendata.jwtToken);
    localStorage.setItem('refreshtoken', tokendata.refreshToken);
  }

  Logout() {
    alert('Your session expired')
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  GetRolebyToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    console.log(this.tokenresp);
    return this.tokenresp.role;
  }

  GetMenubyrole(role: any) {
    return this.http.get(this.apiurl + 'getmenu/' + role)
  }
  HaveAccess(role: any, menu: any) {
    return this.http.get(this.apiurl + 'HaveAccess?role=' + role + '&menu=' + menu);
  }
}
