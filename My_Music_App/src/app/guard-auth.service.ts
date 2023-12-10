import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class GuardAuthService {
  // Initialization

  constructor(private auth: AuthService, private router: Router) {}

  // Methods

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    //check if accessToken is expired
    if (this.auth.isTokenExpired()) {
      this.auth.refreshToken();
    }

    return true;
  }
}
