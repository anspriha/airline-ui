import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-airline',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutAirlineComponent {
  airlineInfo = {
    name: 'VOLVO Airlines',
    founded: 1990,
    mission: 'To connect the world with safe, efficient, and eco-friendly travel.',
    fleetSize: 180,
    destinations: [
      'MUMBAI', 'DELHI', 'BANGALORE', 'HYDERABAD', 'CHENNAI', 'MANGLORE', 'PUNE'
    ],
    team: [
      { name: 'ALEX', role: 'CEO' },
      { name: 'SMITH', role: 'Chief Operating Officer' },
      { name: 'ELLEN', role: 'Chief Pilot' },
      { name: 'MAX', role: 'Head of Customer Service' }
    ],
    history: `VOLVO Airlines was founded in 1990 with a vision to connect people around the world. 
              We started with a fleet of just 5 aircraft and have since grown into a global leader 
              in air travel, known for our commitment to safety, service, and sustainability.`,
    values: [
      'Safety First',
      'Customer Satisfaction',
      'Innovation and Sustainability',
      'Integrity and Trust'
    ]
  };
}
