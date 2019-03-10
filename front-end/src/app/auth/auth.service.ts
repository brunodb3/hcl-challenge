// auth.service.ts
//  - auth service declaration
// -----------------------------------------------------------------------------

// importing 3rd party libraries
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  /**
   * @description Sends a login request to the API
   * @param email Email to send
   * @param password Password to send
   */
  sendLogin(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * @description Sends a signup request to the API
   * @param email Email to send
   * @param password Password to send
   */
  sendSignup(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * @description Returns the current user (null if not logged in)
   * @returns The current user or null
   */
  currentUser(): Observable<any> {
    return this.afAuth.user;
  }

  /**
   * @description Logs the current user out
   */
  logout() {
    return this.afAuth.auth.signOut();
  }
}
