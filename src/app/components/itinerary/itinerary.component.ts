import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    ItineraryService
  ],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent {

  from: FormControl = new FormControl();
  to: FormControl = new FormControl();

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this.watchForm();
  }

  private watchForm(): void {
    this.from.valueChanges.subscribe((from) => {
      void this.itineraryService.getCity(from);
    })

  }
}
