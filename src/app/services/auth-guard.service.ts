import { AuthServiceService } from './auth-service.service';
import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  data: boolean;
  constructor(private authSvc: AuthServiceService,
    private router: Router, private zone: NgZone
  ) {

  }
  async canActivate() {
    let res;
    await this.authSvc.isLoggedIn().then(x => {
      res = x;
    });
    if (!res) {
      this.zone.run(() => {
        this.router.navigate(['/login-page']);
      });
    }
    return res;
  }

  canActivateChildFull() {

  }
}
