import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string): any {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
