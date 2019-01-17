import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AuthData} from '../../auth-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authData: AuthData;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authData = new AuthData(form.value.email, form.value.password);
    this.authService.createUser(this.authData).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
