import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';  // Assuming you have an ApiService for making API calls
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,  // Mark the component as standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],  // Include necessary imports
  //selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup; // FormGroup for the registration form
  errorMessage: string = '';  // To store error messages
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,  // Inject FormBuilder to create the form
    private apiService: ApiService,  // Inject ApiService to call the registration API
    private router: Router  // For navigation after registration
  ) {
    // Initialize the form with validation rules directly in the constructor
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      gender: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,20}$') // Password requirements
      ]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  // Method to handle form submission
  onRegister(): void {
    console.log("registrationData")

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const registrationData = this.registerForm.value;  // Extract form data
    console.log("registrationData", registrationData);
    // Call the register API from the ApiService
    this.apiService.register(registrationData).subscribe(
      (response) => {
        this.successMessage = 'Registration successful! Click on Login';
        this.resetForm();
        // On success, redirect to login page or any other page
        //this.router.navigate(['/login']);
      },
      (error) => {
        // Handle error response (invalid data, server error, etc.)
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }

  resetForm() {
    this.registerForm.reset();  // Reset all form fields to their initial state
  }

  // Getter methods for form controls to use in the template
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get mobileNumber() {
    return this.registerForm.get('mobileNumber');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
