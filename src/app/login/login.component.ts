import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';  // Assuming you have an ApiService for making API calls
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  standalone: true,
  //selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isAuthenticated: boolean = false;
  userName: string | null = null;
  loginErrorMessage: string | null = null;


  constructor(
    private fb: FormBuilder, // Inject FormBuilder to create the form
    private apiService: ApiService,
    private authService: AuthService,  // Inject ApiService to call the registration API
    private router: Router  // For navigation after registration
  ) {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]], // username validation
      password: ['', [Validators.required, Validators.minLength(4)]] // Password validation
    });
  }

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
      this.errorMessage = 'Please enter correct username/password.';
      return;
    }

    const { userName, password } = this.loginForm.value;
    console.log("inside login:" + userName);

    this.authService.login(userName, password).subscribe(response => {
      if (response) {
        // Handle successful login (response is not null)
        console.log('Login Successful');
        this.router.navigate(['/searchflight']);
        // You could route to a different page or show a success message
      } else {
        // Handle login failure (response is null)
        console.log('Login Failed');
        this.errorMessage = "Invalid Credentials";
        // Show an error message to the user
      }
    });

  }

  getUsername(): string | null {
    return this.userName;
  }

}
