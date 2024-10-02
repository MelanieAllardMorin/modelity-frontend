import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cities, City } from '../../../constants/cities';
import { ItineraryComponent } from './itinerary.component';

import testbedBase from "../../../constants/testBedBase";

describe('ItineraryComponent', () => {
  let component: ItineraryComponent;
  let fixture: ComponentFixture<ItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testbedBase)
      .compileComponents();

    fixture = TestBed.createComponent(ItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display city name', () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const city = cities[randomIndex];
    const displayedName = component.displayCityName(cities.find(c => c.name === city.name) as City);
    expect(displayedName).toBe(city.name);
  });
});
