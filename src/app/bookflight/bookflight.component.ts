import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-bookflight',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './bookflight.component.html',
  styleUrls: ['./bookflight.component.css']
})
export class BookFlightComponent {
  bookFlightForm: FormGroup;
  flightDetails: any;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.flightDetails = history.state.flight || null;
    this.bookFlightForm = this.fb.group({
      bookFlight: this.fb.group({
        // nameOfAirline: [''],
        flightNumber: [''],
        origin: [''],
        destination: [''],
        flightDate: [''],
        flightTime: [''],
        fare: ['']
      }),
      passengers: this.fb.array([
        this.createPassenger()
      ])
    });

    if (this.flightDetails) {
      this.populateFlightDetails();
    }
  }

  private populateFlightDetails(): void {
    this.bookFlightForm.patchValue({
      bookFlight: {
        // nameOfAirline: this.flightDetails.nameOfAirline,
        flightNumber: this.flightDetails.flightNumber,
        origin: this.flightDetails.origin,
        destination: this.flightDetails.destination,
        flightDate: this.flightDetails.flightDate,
        flightTime: this.flightDetails.flightTime,
        fare: this.flightDetails.fare.fare
      }
    });
  }


  // Create a passenger form group
  createPassenger(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  // Get passengers as a FormArray
  passengers(): FormArray {
    return this.bookFlightForm.get('passengers') as FormArray;
  }

  // Add a passenger dynamically
  addPassenger(): void {
    if (this.passengers().length < 4) {
      this.passengers().push(this.createPassenger());
    }
  }

  // Submit the form
  onBookSubmit(): void {

    console.log("bookFlightData")

    if (this.bookFlightForm.invalid) {
      this.errorMessage = 'Please Try Again.';
      return;
    }

    const bookFlightData = this.bookFlightForm.value;

    this.apiService.bookFlight(bookFlightData).subscribe(
      (response) => {
        this.successMessage = 'Flight is Booked successfully'; 
        
      },
      (error) => {
        // Handle error response (invalid data, server error, etc.)
        this.errorMessage = 'Try once again.';
        console.error('Error booking flight:', error);
      }
    );

  }
}
