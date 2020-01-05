import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { parse } from 'query-string';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class LoginResolver implements Resolve<void> {
  constructor(private auth: AuthService, private router: Router) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const resp = parse(route.fragment);
    const token = resp.access_token as string;
    this.auth.handleToken(token);
    console.log(token);
    return this.router.navigate(['home']);
  }
}
