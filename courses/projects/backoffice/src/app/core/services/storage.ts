import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}
