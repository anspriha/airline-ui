import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  // Define the contact object that will hold the user's input
  contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Flag to display the thank-you message after form submission
  formSubmitted = false;

  // Method to handle form submission
  onSubmit() {
    if (this.contact.name && this.contact.email && this.contact.subject && this.contact.message) {
      // Simulate form submission (e.g., send to a server or email)
      console.log('Form Submitted:', this.contact);

      // Show the thank-you message and reset the form
      this.formSubmitted = true;

      // Optionally, clear the form after submission
      this.contact = { name: '', email: '', subject: '', message: '' };
    }
  }
}
