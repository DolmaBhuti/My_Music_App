import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService
  ) {}

  searchString: any;
  public accessToken: any;
  logoutSub: Subscription | undefined;
  email: any;

  public handleSearch() {
    //programmatically navigate //import Router, use navigate method
    console.log('searchString: ' + this.searchString);
    this.router.navigate(['search'], { queryParams: { q: this.searchString } });
    this.searchString = '';
  }
  logout() {
    this.logoutSub = this.authService.logout().subscribe(
      (result) => {
        console.log('successfully logged out');
      },
      (err) => {
        console.error('Error logging out', err);
      }
    );
    this.router.navigate(['/login']);
  }
  //event instanceof NavigationStart
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // only read the token on "NavigationStart"
        this.accessToken = this.authService.readToken();
        this.email = this.authService.getEmail();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.logoutSub) {
      this.logoutSub.unsubscribe();
    }
  }
}
