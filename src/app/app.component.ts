import { Component } from '@angular/core';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ItineraryComponent,
    MapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'modelity-frontend';
}
