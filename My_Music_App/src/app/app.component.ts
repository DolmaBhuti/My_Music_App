import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

//import { AboutComponent } from './about/about.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private modalService: NgbModal, private router: Router) {}

  searchString: any;
  public handleSearch() {
    //programmatically navigate //import Router, use navigate method
    console.log('searchString: ' + this.searchString);
    this.router.navigate(['search'], { queryParams: { q: this.searchString } });
    this.searchString = '';
  }

  userName = 'John Smith';
  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
