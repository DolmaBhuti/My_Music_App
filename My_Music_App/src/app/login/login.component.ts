import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy, OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  loading: any = false;
  warning: string = '';
  loginSub: Subscription | undefined;
  user = {
    email: '',
    password: '',
  };
  onSubmit(f: NgForm) {
    if (this.user.email !== '' && this.user.password !== '') {
      this.loading = true;

      this.loginSub = this.authService.login(this.user).subscribe(
        (result) => {
          console.log(this.user.email + ' has been logged in.');
          // TODO:  set localhost property "accessToken" to result.token
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          localStorage.setItem('email', this.user.email);
          console.log(localStorage.getItem('accessToken'));
          // TODO: redirect to newreleases page using router
          this.router.navigate(['newReleases']);

          this.loading = false;
          this.warning = '';
        },
        (err) => {
          console.log('failure to login');
          this.loading = false;
          this.warning = err.error.error.message;
          console.log('error message from API: ', this.warning);
        }
      );
    }
  }
  ngOnInit(): void {
    this.title.setTitle('Sign In');
  }
  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
