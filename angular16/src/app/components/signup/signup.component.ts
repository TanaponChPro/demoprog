import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      name: new UntypedFormControl("", [Validators.required, Validators.minLength(2)]),
      email: new UntypedFormControl("", [Validators.required, Validators.email]),
      password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  signup(): void {
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      console.log(msg);
      this.router.navigate(["login"]);
    });
  }
}
