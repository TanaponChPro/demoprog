import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      email: new UntypedFormControl("", [Validators.required, Validators.email]),
      password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    // console.log('func: login')
    // ถ้าล็อกอินได้ หรือไม่ได้ จะเซ็ตเส้นทาง ทีฟังก์ชัน login in module auth.service
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe();

  }

  // returnUrl : string;
  // ErrorMessage: string;
  // invalidLogin: boolean;
  // responsedata: any;
  // Proceedlogin() {
  //   if (this.loginForm.valid) {
  //     this.authService.logintype2(this.loginForm.value).subscribe(result => {
  //       // console.log(result)
  //       this.responsedata = result;
  //       if (this.responsedata != null) {
  //         localStorage.setItem('token', this.responsedata.token);
  //         // this.authService.updatemenu.next();
  //         this.route.navigate(['']);
  //       } else {
  //         alert("login Failed");
  //       }
  //     });

  //     this.AcctService.login(this.loginForm.value).subscribe(result => {
  //       let token = (<any>result).token;
  //       console.log(token);
  //       console.log(result.userrole);
  //       console.log("User Logged In Successfully");
  //       this.invalidLogin = false;
  //       console.log(this.returnUrl);
  //       this.route.navigate(['']);
  //     },
  //       error => {
  //         this.invalidLogin = true;
  //         this.ErrorMessage = error.error.loginError;
  //         console.log(this.ErrorMessage);
  //       }
  //     ); 
  //   }
  // }

}
