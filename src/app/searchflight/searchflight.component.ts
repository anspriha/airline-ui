import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';  // Assuming you have an ApiService for making API calls
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-searchflight',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './searchflight.component.html',
  styleUrl: './searchflight.component.css'
})
export class SearchflightComponent {

  searchFlightForm: FormGroup;
  flights: any[] = [];
  cities: string[] = ['BENGALURU', 'CHENNAI', 'DELHI', 'HYDERABAD', 'MUMBAI', 'PUNE', 'KOLKATA', 'AHMADABAD'];
  successMessage: string = '';
  errorMessage: string = '';
  isAuthenticated: boolean = false; // Example, update based on your authentication service

  constructor(
    private fb: FormBuilder,  // Inject FormBuilder to create the form
    private apiService: ApiService,  // Inject ApiService to call the registration API
    private router: Router  // For navigation after registration
  ) {
    // Initialize the form with validation rules directly in the constructor
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.isAuthenticated = navigation.extras.state['isAuthenticated'];
    }
    this.searchFlightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      flightDate: ['', Validators.required]
    });
  }

  onSearchFlight(): void {

    console.log("searchFlightData")

    if (this.searchFlightForm.invalid) {
      this.errorMessage = 'Please Try Again.';
      return;
    }

    const searchFlightData = this.searchFlightForm.value;

    this.apiService.searchFlight(searchFlightData).subscribe(
      (response) => {
        this.successMessage = 'Available flights are here';
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
        }
      },
      (error) => {
        // Handle error response (invalid data, server error, etc.)
        this.errorMessage = 'Try once again.';
        console.error('Please fill the correct data.', error);
      }
    );

  }

  bookFlight(flight: any): void {
    console.log('Booking flight', flight);
    this.router.navigate(['/bookFlight'], { state: { flight } });
  }
  


}
