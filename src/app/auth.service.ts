import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:7070';

  private isAuthenticatedStatus: boolean = false;
  private userName: string | null = null;
  private loggedIn: boolean = false;

  // We use BehaviorSubject to hold the current authentication state, which can be observed by components
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticatedStatus);
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Simulates login process.
   * In a real-world scenario, you would probably call an API to authenticate the user.
   */
  login(userName: string, password: string) {
    console.log('Attempting login with:', userName, password);
    console.log("username:" + userName);
    // Simple check (replace with actual authentication logic)
    return this.http.post<any>(`${this.apiUrl}/api/login`, { userName, password })
      .pipe(
        catchError(error => {
          console.error('Login error', error);  // Log error if something goes wrong
          return of(null);  // Return an empty array or any default value to continue the observable chain
        })
      ).pipe(
        tap(response => {
          if (response) {
            console.log("inside response");
            this.isAuthenticatedStatus = true;
            this.userName = userName;  // Store the userName
            this.authStatusSubject.next(this.isAuthenticatedStatus);  // Notify subscribers
            console.log('Login successful');
          } else {
            console.log('Login failed');
            this.isAuthenticatedStatus = false;  // Optionally reset the status
            this.authStatusSubject.next(this.isAuthenticatedStatus);  // Notify subscribers
          }
        })
      );
  }

  /**
   * Returns whether the user is authenticated or not.
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedStatus;
  }

  /**
   * Returns the username of the authenticated user.
   */
  getUsername(): string | null {
    return this.userName;
  }

  login1() {
    this.loggedIn = true;
  }

  logout1() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  /**
   * Logout the user.
   */
  logout(): void {
    this.isAuthenticatedStatus = false;
    this.userName = null; // Clear the stored username
    this.authStatusSubject.next(this.isAuthenticatedStatus);  // Notify all subscribers of the logout state
  }
}
