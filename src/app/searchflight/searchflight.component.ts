import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';  // Assuming you have an ApiService for making API calls
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  standalone: true,
  selector: 'app-searchflight',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './searchflight.component.html',
  styleUrl: './searchflight.component.css'
})
export class SearchflightComponent implements OnInit {

  searchFlightForm: FormGroup;
  loginForm: FormGroup;
  flights: any[] = [];
  cities: string[] = ['BENGALURU', 'CHENNAI', 'DELHI', 'HYDERABAD', 'MUMBAI', 'PUNE', 'KOLKATA', 'AHMADABAD'];
  successMessage: string = '';
  errorMessage: string = '';
  isAuthenticated: boolean = false;
  userName: string | null = null;
  loginErrorMessage: string | null = null;// Example, update based on your authentication service

  constructor(
    private fb: FormBuilder,  // Inject FormBuilder to create the form
    private apiService: ApiService,  // Inject ApiService to call the registration API
    private router: Router,
    private authService: AuthService // For navigation after registration
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Initialize the form with validation rules directly in the constructor
    /*const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.isAuthenticated = navigation.extras.state['isAuthenticated'];
    }*/

    this.searchFlightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      flightDate: ['', Validators.required]
    });
  }
  // Initialize the form with validation rules directly in the constructor
  ngOnInit(): void {

    // Initialize the login form


    // Subscribe to the auth status to update the UI based on the authentication state
    this.authService.authStatus$.subscribe((status) => {
      console.log('Authentication Status:', status);
      this.isAuthenticated = status;
      this.userName = this.authService.getUsername();
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { userName, password } = this.loginForm.value;
    console.log("inside login:" + userName);
    const loggedIn = this.authService.login(userName, password);

    if (loggedIn) {
      this.router.navigate(['/search']); // Redirect to the flight search page after login
    } else {
      this.loginErrorMessage = 'Invalid credentials, please try again.';
      console.log('Invalid credentials');
    }
  }
  onSearchFlight(): void {

    console.log("searchFlightData")

    if (this.searchFlightForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const searchFlightData = this.searchFlightForm.value;

    this.apiService.searchFlight(searchFlightData).subscribe(
      (response) => {
        this.flights = response; // Handle the response and store it in flights array

        /* this.successMessage = 'Available flights are here';
         console.log('Response:' + response);
         if (Array.isArray(response)) {
           // If response is an array and contains elements
           if (response.length > 0) {
             this.flights = response;  // Capture the flights data
             this.errorMessage = '';  // Clear the error message
           } else {
             this.flights = [];  // If no flights, ensure `this.flights` is an empty array
             this.errorMessage = 'No Records found';
           }
         } else {
           // If response is not an array (unexpected format)
           this.errorMessage = 'Unexpected response format';
         }
 
         // Optional: If there's no error, redirect to the search flight page
         if (!this.errorMessage) {
           this.router.navigate(['/searchflight']);
         }*/
      },
      (error) => {
        // Handle error response (invalid data, server error, etc.)
        this.errorMessage = 'Failed to fetch flight data.';
        console.error(error);
      }
    );
  }

  bookFlight(flight: any): void {
    console.log('Booking flight', flight);
    this.router.navigate(['/bookFlight'], { state: { flight } });
  }


  login(username: string, password: string): void {
    const loggedIn = this.authService.login(username, password);
    if (loggedIn) {
      this.isAuthenticated = true;
      console.log('User logged in!');
    } else {
      console.log('Invalid credentials');
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    console.log('User logged out!');
  }

  get origin() {
    return this.searchFlightForm.get('origin');
  }

  get destination() {
    return this.searchFlightForm.get('destination');
  }

  get flightDate(): Date {
    return this.flightDate;
  }

  // Optionally, a formatted flightDate getter for easier display
  get formattedFlightDate(): string {
    return this.flightDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD
  }
}