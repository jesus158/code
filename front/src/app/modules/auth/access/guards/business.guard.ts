import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BusinessService } from 'src/app/modules/dashboard/business/business.service';

export const businessGuard: CanActivateFn = (route, state) => {
  const businessService: BusinessService = inject(BusinessService);
  const router: Router = inject(Router);
  const cookieService: CookieService = inject(CookieService);

  if (!businessService.get_Business(cookieService.get('b_a'))) {
    /*   this.toastr.info('Please Log In!'); */
    router.createUrlTree(['/access']);
    return false;
  }
  // logged in, so return true
  /*   authService.isAuthenticated(); */
  return true;
};
