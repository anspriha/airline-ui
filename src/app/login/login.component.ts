import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';  // Assuming you have an ApiService for making API calls
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = ''; 
  successMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // username validation
      password: ['', [Validators.required, Validators.minLength(4)]] // Password validation
    });
  }

  onLogin() {

    //console.log("registrationData")
    
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in the form correctly.';
      return;
    }

    const loginData = this.loginForm.value;  // Extract form data
    console.log("loginData", loginData);
    // Call the login API from the ApiService
    this.apiService.login(loginData).subscribe(
      (response) => {
        this.successMessage = 'login successful!';
        // On success, redirect to search page
        //this.router.navigate(['/searchflight']);
        this.router.navigate(['/searchflight'], { state: { isAuthenticated: true } });
      },
      (error) => {
        // Handle error response (invalid data, server error, etc.)
        this.errorMessage = 'Credentials Invalid';
        console.error('Password Incorrect', error);
      }
    );

   
    
  }
}
