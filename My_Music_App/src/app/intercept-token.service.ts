import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpResponse, //use to add token to every request
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  private auth_api = environment.userAPIBase; //environment variables

  //write a method that intercept every request that doesnt contain spotify.com
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    if (
      !request.url.includes('spotify.com') ||
      request.url.includes('logout')
    ) {
      console.log('Adding Authorization header');

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(request);
  }
  // private handle401AuthorizationError(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ) {}
  //refresh token method
  // refreshToken(token: string) {
  //   return this.http.post(
  //     this.auth_api + 'refreshtoken',
  //     {
  //       refreshToken: token,
  //     },
  //     {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     }
  //   );
  // }
}

// write an HttpInterceptor service to  automatically add that
//token to every request except if the request url contains
//"spotify.com"
//– we  already add the correct token in this case.
