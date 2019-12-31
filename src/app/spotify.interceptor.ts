import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('spotify')) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${this.auth.token}` } });
    }
    return next.handle(req);
  }
}
