import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import { City } from "../../constants/cities";
import { environment } from "../../environments/environment";

export interface Itinerary {
  color: string;
  total_duration_s: number;
  path: Array<[number, number]>;
}

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private _departure: BehaviorSubject<City | null> = new BehaviorSubject<City | null>(null);
  departure: Observable<City | null> = this._departure.asObservable();

  private _destination: BehaviorSubject<City | null> = new BehaviorSubject<City | null>(null);
  destination: Observable<City | null> = this._destination.asObservable();

  private _itineraries: BehaviorSubject<{ [key: number]: Itinerary }> = new BehaviorSubject<{ [key: number]: Itinerary }>({});
  itineraries: Observable<{ [key: number]: Itinerary }> = this._itineraries.asObservable();

  private _error: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  error: Observable<string | null> = this._error.asObservable();

  constructor(private http: HttpClient) {
  }

  async calculateItinerary(from: City, to: City): Promise<void> {
    console.info(`Calculating best itinerary between ${from.name} and ${to.name}...`);
    this._error.next(null);
    try {
      let result;
      if (environment.failureMode) {
        result = await firstValueFrom(this.http.get<{ [key: number]: Itinerary }>(`${environment.api}/plan?from=${from.name}&to=${to.name}`));
      } else {
        result = this._generateFakeResult(from, to);
      }
      this._itineraries.next(result);
    } catch (error: any) {
      this._error.next(error.message?.toString());
    }
  }

  setDeparture(city: City): void {
    this._departure.next(city);
  }

  setDestination(city: City): void {
    this._destination.next(city);
  }

  private _generateFakeResult(from: City, to: City): { [key: number]: Itinerary } {
    return {
      1: {
        color: "#5394cf",
        total_duration_s: 720,
        path: [
          [from.latitude, from.longitude],
          [48.864716, 2.349014], // Travel via Paris like trains do
          [to.latitude, to.longitude]
        ]
      }
    }
  }
}
