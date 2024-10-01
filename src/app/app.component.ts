import { Component } from '@angular/core';
import { ItineraryComponent } from './itinerary/itinerary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItineraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'modelity-frontend';
}
