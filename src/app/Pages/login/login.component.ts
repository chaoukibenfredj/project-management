import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UserLogin } from 'src/app/models/UserLogin.model';
import { Router } from '@angular/router';
import { Globals } from 'src/app/service/globals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loadingState = false;

  name = 'Chaouki';

  loginFormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globals: Globals,
    private router: Router) { }

  ngOnInit() {
  }


  onLogin() {
    console.log('login clicked');

    this.loadingState = true;

    const userLogin = new UserLogin();
    userLogin.username = this.loginFormGroup.get('username').value;
    userLogin.password = this.loginFormGroup.get('password').value;

    this.authService.loginUser(userLogin).subscribe(result => {
      console.log(result);
      this.loadingState = false;
      this.globals.role = 'fuck' ;
      this.authService.saveToken(result.token);
      this.authService.decodeAndSetCurrentUser(result.token);
      this.router.navigate(['/app']);
    }, err => {
      console.log(err);
      console.log('Failed');
      this.loadingState = false;
    });


  }
}
