import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.cookieService.get('j_a');
    let request = req;

    if (this.authService.isAuthenticated()) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }


    return next.handle(request);
  }
}
