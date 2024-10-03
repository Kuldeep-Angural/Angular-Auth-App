import { Injectable } from '@angular/core';
import { SESSION_KEYS } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  getUser(): any {
    if (this.isBrowser()) {
      return JSON.parse(window.localStorage.getItem(SESSION_KEYS.USER) || 'null');
    }
   
  }

   removeUser() {
    if (this.isBrowser()) {
      return localStorage.removeItem(SESSION_KEYS.USER)
    }
    return null;
  }
}
