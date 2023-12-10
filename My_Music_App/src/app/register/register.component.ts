import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy, OnInit {
  //NOTE: this is the  data that is synced to the form
  constructor(private authService: AuthService, private title: Title) {}
  registerUser = {
    email: '',
    password: '',
    confirm_password: '',
  };
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;
  private registerSub: Subscription | undefined;

  onSubmit(f: NgForm): void {
    if (this.registerUser.email !== '') {
      this.loading = true;
      console.log(this.registerUser);

      this.registerSub = this.authService
        .registerUser(this.registerUser)
        .subscribe(
          (result) => {
            console.log('success');
            this.success = true;
            this.loading = false;
            this.warning = '';
          },
          (err) => {
            console.log('failure to register user');
            this.success = false;
            this.loading = false;
            this.warning = err.error.message;
          }
        );
    }
  }
  ngOnInit(): void {
    this.title.setTitle('Register');
  }
  ngOnDestroy(): void {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}
