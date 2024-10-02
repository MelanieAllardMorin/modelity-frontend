import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';
import { cities, City } from '../../../constants/cities';
import { ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'
})
export class ItineraryComponent {

  from: FormControl = new FormControl();
  to: FormControl = new FormControl();

  filteredCitiesFrom: Observable<City[]> = new Observable<City[]>();
  filteredCitiesTo: Observable<City[]> = new Observable<City[]>();

  errorMessage: Observable<string | null>;

  constructor(
    private itineraryService: ItineraryService
  ) {
    this.errorMessage = this.itineraryService.error;
  }

  ngOnInit(): void {
    this._initCityChoices();
    this._watchForm();
  }

  displayCityName(city: City): string {
    return city?.name ?? '';
  }

  departureSelected(city: City): void {
    this.itineraryService.setDeparture(city);
  }

  destinationSelected(city: City): void {
    this.itineraryService.setDestination(city);
  }

  calculateItinerary(): void {
    this.itineraryService.calculateItinerary(this.from.value, this.to.value);
  }

  private _initCityChoices(): void {
    this.filteredCitiesFrom = this.from.valueChanges.pipe(
      startWith(''),
      map((value: string | City) => this._filter(value ?? ''))
    );
    this.filteredCitiesTo = this.to.valueChanges.pipe(
      startWith(''),
      map((value: string | City) => this._filter(value ?? ''))
    );
  }

  private _filter(value: string | City): City[] {
    const filterValue = ((typeof value === "string") ? value as string : (value as City).name).toLowerCase();
    const choices = cities.filter(city => city.name.toLowerCase().includes(filterValue));
    return choices.sort((a, b) => a.name.localeCompare(b.name))
  }

  private _watchForm(): void {
    combineLatest([this.from.valueChanges, this.to.valueChanges]).pipe(filter(([from, to]) => from?.lat && to?.lat)).subscribe(([from, to]) => {
      void this.itineraryService.calculateItinerary(from, to);
    });
  }
}
