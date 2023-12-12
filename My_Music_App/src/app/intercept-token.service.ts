import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  // write an HttpInterceptor service to  automatically add that
  //token to every request except if the request url contains
  //"spotify.com"
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
}
