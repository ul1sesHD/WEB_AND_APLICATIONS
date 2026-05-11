import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const profile = await auth.getCurrentProfile();
  if (!profile || profile.role !== 'admin') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
