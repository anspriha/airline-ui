
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string | null = null;
  loggedIn: boolean = false;
  showHeader: boolean = true;
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Listen for route change events
    ).subscribe((event: NavigationEnd) => {
      // Check if the current route is login or any other route where header should be hidden
      this.showHeader = event.url !== '/searchflight' && event.url !== '/bookFlight';
      // Change '/login' to any route where header should be hidden
    });

  }
  ngOnInit(): void {
    // Subscribe to the authStatus$ observable to keep track of authentication status
    this.authService.authStatus$.subscribe((authStatus) => {
      this.loggedIn = authStatus;
      if (this.loggedIn) {
        // If logged in, set the username
        this.username = this.authService.getUsername();
      } else {
        // If not logged in, reset username to null
        this.username = null;
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
  login(username: string): void {
    this.authService.getUsername; // Store the username
    this.username = username; // Immediately update the username
  }
  logout() {
    this.authService.logout(); // Clear the token
    this.router.navigate(['/login']);  // Redirect to the login page
  }
}

