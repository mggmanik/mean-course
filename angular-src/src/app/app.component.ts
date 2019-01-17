import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string;
  // expiresIn: number;
  userIdFromParam: string;

  constructor(private authService: AuthService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      // this.expiresIn = +params['expiresIn'];
      this.userIdFromParam = params['userId'];
      // const expiresInDuration = this.expiresIn;
      if (!this.token && !this.userIdFromParam) {
        this.authService.autoAuthUser();
        return;
      }
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 3600 * 1000);
      this.authService.saveAuthData(this.token, expirationDate, this.userIdFromParam);
      this.authService.autoAuthUser();
    });
  }
}
