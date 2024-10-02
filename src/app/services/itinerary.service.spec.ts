import { TestBed } from "@angular/core/testing";
import { cities, City } from "../../constants/cities";
import testbedBase from "../../constants/testBedBase";
import { ItineraryService } from "./itinerary.service";

describe("ItineraryService", () => {
  let service: ItineraryService;

  beforeEach(() => {
    void TestBed.configureTestingModule(testbedBase);
    service = TestBed.inject(ItineraryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set departure city", () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const city = cities[randomIndex];
    let departureCity: City | undefined;
    service.departure.subscribe((d) => {
      departureCity = d as City;
    });
    service.setDeparture(city);
    expect(departureCity).toBeDefined();
    expect(departureCity?.name).toEqual(city.name);
  });
});
