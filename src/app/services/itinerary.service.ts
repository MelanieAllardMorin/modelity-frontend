import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ItineraryService {

  constructor(private http: HttpClient) {

  }

  async getCity(search: string): Promise<string[]> {
    const result = await firstValueFrom(this.http.get(`${environment.cityApi}/search?format=geojson&limit=5&city=${search}`));
    console.log(result);
    return [];
  }
}