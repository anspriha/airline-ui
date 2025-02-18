import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';  // Import Observable for async handling
import { catchError } from 'rxjs/operators';  // To catch and handle errors
import { throwError } from 'rxjs';  // To throw errors
import { LoginComponent } from './login/login.component';
import { HttpHeaders } from '@angular/common/http';
import { FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:7070';

  constructor(private http: HttpClient) {
    console.log('inside API Service');
  }

  register(registrationData: { firstName: string, lastName: string, mobileNumber: Int32List, gender: string, userName: string, password: string }): Observable<any> {
    console.log("registrationData:" + registrationData.firstName);
    return this.http.post(`${this.apiUrl}/api/register`, registrationData).pipe(
      catchError(this.handleError)  // Handle errors here if any
    );

  }

  login(loginData: { userName: string, password: string }): Observable<any> {
    console.log("loginData:" + loginData.userName);
    console.log("loginData:" + loginData);

    console.log("password:" + loginData.password);
    return this.http.post(`${this.apiUrl}/api/login`, loginData).pipe(
      catchError(this.handleError)  // Handle errors here if any
    );

  }

  searchFlight(searchFlightData: { origin: string, destination: string, flightDate: Date }): Observable<any> {
    console.log("ORIGIN:" + searchFlightData.origin);
    console.log("DESTINATION:" + searchFlightData.destination);
    console.log("DATE:" + searchFlightData.flightDate);
    console.log(searchFlightData);
    return this.http.post(`${this.apiUrl}/api/searchFlights`, searchFlightData).pipe(
      catchError(this.handleError)  // Handle errors here if any
    );

  }

  bookFlight(bookFlightData: { origin: string, destination: string, flightDate: Date, passengers: FormArray }): Observable<any> {
    console.log("searchFlightData:" + bookFlightData);
    return this.http.post(`${this.apiUrl}/api/bookFlight`, bookFlightData, {
      responseType: 'text'  // Ensure the response is treated as plain text
    }).pipe(
      catchError(this.handleError)  // Handle errors here if any
    );

  }

  // Handle API errors
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error: ${error.status}, Message: ${error.message}`;
    }
    return throwError(errorMessage);  // Return error message to the component
  }
}
