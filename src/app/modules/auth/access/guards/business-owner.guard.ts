import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BusinessOwnerService } from 'src/app/modules/dashboard/account/components-account/business-owner/business-owner.service';

export const businessOwnerGuard: CanActivateFn = (route, state) => {
  const businessOwnerService: BusinessOwnerService =
    inject(BusinessOwnerService);
  const router: Router = inject(Router);
  const cookieService: CookieService = inject(CookieService);

  if (!businessOwnerService.get_business_owner()) {
    /*   this.toastr.info('Please Log In!'); */
    router.createUrlTree(['/access']);
    return false;
  }
  // logged in, so return true
  /*   authService.isAuthenticated(); */
  return true;
};
