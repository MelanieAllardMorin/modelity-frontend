import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import L from 'leaflet';
import { ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'app-map',
  standalone: true,
  providers: [
    ItineraryService
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  private map: L.Map | undefined;

  from: FormControl = new FormControl();
  to: FormControl = new FormControl();

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this.initMap();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [46, 3],
      zoom: 6
    });

    // Set up tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
