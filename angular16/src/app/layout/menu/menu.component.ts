import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, DoCheck {

  isAuthenticated = false;
  isAdminRole = true;
  isTechnicRole = false;
  isStockRole = false;
  menulist: any;
  tmp: any;

  constructor(private authService: AuthService, private router: Router, private sharedService:SharedService) { }

  lifecycleTicks: number = 0;
  ngDoCheck(): void {
    if (this.authService.getUserRole()) { 
    // if (localStorage.getItem('loginStatus') == '1') {
      this.tmp = this.authService.getUserRole();
      this.isAuthenticated = true;
      this.isAdminRole = true;
      this.isTechnicRole = (this.tmp == 'technic') ? true : false;
      this.isStockRole = (this.tmp == 'stock') ? true : false;
    } else {
      this.isAuthenticated = false;
    }
    // console.log('loginStatus:' +localStorage.getItem('loginStatus'));
    // console.log('lifecycle:' + this.lifecycleTicks++ + ', isAuth:' +  this.isAuthenticated + ', userLogin:' + this.authService.isUserLoggedIn$.value); 

    // this.isAuthenticated = this.authService.isUserLoggedIn$.value
    // this.lifecycleTicks++;
    // this.authService.menuload;
    // console.log('isAuthenticated: ' + this.isAuthenticated + ', menu-lifecycleTicks: ' + this.lifecycleTicks.toString());
    // if (this.isAuthenticated) { // && (this.authService.menuload == 0) 
    //   this.menulist = this.authService.menulist$; // สามารถเป็น load is menu-list แต่ยังไม่ใช้วิธีนี อาจจะใช้ในอนาคต
    //   this.isTechnicRole = this.authService.isShowMenu.isTechnicRole;
    //   this.isStockRole = this.authService.isShowMenu.isStockRole;
    //   this.authService.menuload++;
    //   this.isLoadedMenu = true;
    //   console.log('xxxxxx: ' + this.authService.isShowMenu);
    // }
  }

  ngOnInit(): void {
    // this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
    //   this.isAuthenticated = isLoggedIn;
    // });
    // console.log('isUserLoggedIn: ' + this.authService.isUserLoggedIn$.value);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.isAdminRole = true;
    this.isTechnicRole = false;
    this.isStockRole = false;
    this.authService.logout();
    this.router.navigate(["login"]);

    // localStorage.removeItem("token");
    // this.authService.isUserLoggedIn$.next(false);
    // this.authService.isShowMenu.isAdminRole = false;
    // this.authService.isShowMenu.isTechnicRole = false;
    // this.authService.isShowMenu.isStockRole = false;
    // this.isAuthenticated = false;
    // this.isAdminRole = false;
    // this.isTechnicRole = false;
    // this.isStockRole = false;
    // this.sharedService.userLogin = "";
    // // console.log('isUserLoggedIn: ' + this.authService.isUserLoggedIn$.value);
    // this.router.navigate(["login"]);
  }

  /*
    ngOnInit(): void {
      this.authService.menuload++;
      console.log('memu load count: ' + this.authService.menuload.toString() );
      this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
      });
  
      this.authService.updatemenu.subscribe(res => {
        console.log('update menulist: ' + this.menulist$);
        this.MenuDisplay();
        this.LoadMenu();
      });
      this.MenuDisplay();
      this.LoadMenu();
      console.log('menulist: ' + this.menulist$);
    }
  
    logout(): void {
      localStorage.removeItem("token");
      this.authService.isUserLoggedIn$.next(false);
      this.router.navigate(["login"]);
    }
  
    displaymenu = false;
    displayemployee = false;
    displayuser = false;
    currentrole: any;
  
    MenuDisplay() {
      if (this.authService.GetToken() != '') {
        this.currentrole = this.authService.GetRolebyToken(this.authService.GetToken());
        this.displayemployee = this.currentrole == 'admin';
        this.displayuser = (this.currentrole == 'admin' || this.currentrole == 'user')
      }
    }
  
    // LoadMenu() {
    //   console.log('roleId: ' +this.authService.roleId);
    //   if (this.authService.GetToken() != '') {
    //     this.authService.GetMenubyrole(this.authService.roleId).subscribe(result => {
    //       this.menulist$ = result;
    //     });
    //   }
    // }
    LoadMenu() {
      if (this.authService.GetToken() != '') {
        this.currentrole = this.authService.GetRolebyToken(this.authService.GetToken());
        this.authService.GetMenubyrole(this.currentrole).subscribe(result => {
          this.menulist$ = result;
        });
      }
    }
  */
}
