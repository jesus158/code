import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/modules/dashboard/configuration/user/user.service';

export const userGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  const cookieService: CookieService = inject(CookieService);

  if (!userService.get_User(cookieService.get('u_a'))) {
    /*   this.toastr.info('Please Log In!'); */
    router.createUrlTree(['/access']);
    return false;
  }
  // logged in, so return true
  /*   authService.isAuthenticated(); */
  return true;
};
