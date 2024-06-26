import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthDTO } from "src/app/Models/auth.dto";
import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { AuthService } from "src/app/Services/auth.service";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginUser = new AuthDTO("", "", "", "");

    this.email = new UntypedFormControl("", [
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]);

    this.password = new UntypedFormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService.login(this.loginUser).subscribe({
      next: (authToken) => {
        this.loginUser.user_id = authToken.user_id;
        this.loginUser.access_token = authToken.access_token;
        // save token to localstorage for next requests
        this.localStorageService.set("user_id", this.loginUser.user_id);
        this.localStorageService.set(
          "access_token",
          this.loginUser.access_token
        );

        // update options menu
        const headerInfo: HeaderMenus = {
          showAuthSection: true,
          showNoAuthSection: false,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.router.navigateByUrl("home");

        this.sharedService.managementToast("loginFeedback", true);
      },
      error: (error) => {
        const errorResponse = error.error;
        const headerInfo: HeaderMenus = {
          showAuthSection: false,
          showNoAuthSection: true,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
        this.sharedService.errorLog(error.error);
        this.sharedService.managementToast(
          "loginFeedback",
          false,
          errorResponse
        );
      },
    });
  }
}
