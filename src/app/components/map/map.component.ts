import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import L from 'leaflet';
import { filter, map, Observable } from 'rxjs';
import { City } from '../../../constants/cities';
import { departureMarker, destinationMarker } from '../../../constants/markers';
import { Itinerary, ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  private map: L.Map | undefined;

  from: FormControl = new FormControl();
  to: FormControl = new FormControl();

  private _fromMarker: L.Marker | undefined;
  private _toMarker: L.Marker | undefined;
  private _path: L.Polyline | undefined

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this._initMap();
    this._setMarker(this.itineraryService.departure, this._fromMarker, departureMarker);
    this._setMarker(this.itineraryService.destination, this._toMarker, destinationMarker);
    this._drawItinerary();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }

  private _initMap(): void {
    this.map = L.map('map', {
      center: [46.5, 2.5],
      zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private _clearMap(marker?: L.Marker): void {
    if (this.map) {
      if (this._path) {
        this.map.removeLayer(this._path);
      }
      if (marker) {
        this.map.removeLayer(marker);
      }
    }
  }

  private _drawItinerary(): void {
    this.itineraryService.itineraries
      .pipe(filter(itineraries => !!itineraries && Object.keys(itineraries).length > 0), map((itineraries) => itineraries as { [key: number]: Itinerary }))
      .subscribe((itineraries: { [key: number]: Itinerary }) => {
        this._path = L.polyline(Object.values(itineraries)[0].path,
          { "weight": 2, "color": "#3f51b5" }
        );
        this._clearMap();
        if (this.map) {
          this.map.addLayer(this._path);
          this.map.fitBounds(this._path.getBounds());
        }
      });
  }

  private _setMarker(location: Observable<City | null>, marker: L.Marker | undefined, icon: L.Icon): void {
    location
      .pipe(filter(city => !!city && !isNaN(city.latitude) && !isNaN(city.longitude)), map((city) => city as City))
      .subscribe((city) => {
        this._clearMap(marker);
        marker = new L.Marker([city.latitude, city.longitude], { icon });
        marker.addTo(this.map as L.Map);
      });
  }

}
