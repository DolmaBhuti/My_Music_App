import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyTokenService implements OnDestroy {
  constructor(private http: HttpClient) {}

  private accessToken: string = '';
  private accessTokenExpires: Date = new Date();
  private tokenSub: Subscription | undefined;

  private getAccessToken(): Observable<any> {
    return new Observable((o) => {
      //get references to client id and secret
      const clientID = environment.clientID;
      const clientSecret = environment.clientSecret;

      let encoded = btoa(clientID + ':' + clientSecret);
      const httpParams = new HttpParams().set(
        'grant_type',
        'client_credentials'
      );
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encoded}`,
      });

      this.tokenSub = this.http
        .post<any>('https://accounts.spotify.com/api/token', httpParams, {
          headers: headers,
        })
        .subscribe(
          (token) => {
            console.log('got spotify token');
            this.accessToken = token.access_token;
            this.accessTokenExpires = new Date();
            this.accessTokenExpires.setSeconds(
              this.accessTokenExpires.getSeconds() + token.expires_in
            );
            o.next(this.accessToken);
          },
          (err) => {
            console.error('Error in getting the Spotify API Access Token', err);
          }
        );
    });
  }

  getBearerToken(): Observable<any> {
    if (!this.accessToken) {
      // no access token, so get a fresh one
      return this.getAccessToken();
    } else {
      if (new Date() < this.accessTokenExpires) {
        // access token exists and is valid, so return it
        return new Observable((o) => o.next(this.accessToken));
      } else {
        // access token exists, but is no longer valid, so get a fresh one
        return this.getAccessToken();
      }
    }
  }

  ngOnDestroy(): void {
    this.tokenSub?.unsubscribe();
  }
}
