import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent {

  private map: L.Map | undefined;

  constructor() { }

  ngOnInit(): void {
    this.initMap();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }

  private initMap(): void {
    // Initialize the map and set its view to a specific geographical coordinate and zoom level
    this.map = L.map('map', {
      center: [51.505, -0.09], // Center at London
      zoom: 13
    });

    // Set up tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
