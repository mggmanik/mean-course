import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthData} from '../../auth-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authData: AuthData;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authData = new AuthData(form.value.email, form.value.password);
    this.authService.loginUser(this.authData);
  }

  // onGoogleLogin() {
  //   this.authService.googleLoginUser();
  // }
}
