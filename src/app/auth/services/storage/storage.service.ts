import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }


  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user == null ? "" : user?.role;
  }

  static isAdminLoggIn(): boolean {
    if (this.getToken() == null) return false;
    return this.getUserRole() == "ADMIN";
  }

  static isCustomerLoggIn(): boolean {
    if (this.getToken() == null) return false;
    return this.getUserRole() == "CUSTOMER";
  }

  static hasToken(): boolean {
    return this.getToken() != null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user == null ? 0 : user.id;
  }

  static signOut(): void {
    window.localStorage.clear();
  }

}
