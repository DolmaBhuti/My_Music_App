//bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { MatSnackBarModule } from '@angular/material/snack-bar';
//components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { InterceptTokenService } from './intercept-token.service';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    NewReleasesComponent,
    AlbumComponent,
    ArtistDiscographyComponent,
    FavouritesComponent,
    SearchResultsComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule, //bootstrap
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
