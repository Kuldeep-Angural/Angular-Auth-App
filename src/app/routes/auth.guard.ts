import { CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  
  const user = storageService.getUser();

  if (user) {
    console.log("User found in Storage", user);
    return true;
  } else {
    router.navigate(['/authentication']); 
    return false; 
  }
};
