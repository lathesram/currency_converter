import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://openexchangerates.org/api';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateAPIService {
  private app_id: string = 'aead90a5f6a542269005d774e2c19052'; // Need to get it from the env file. Look for secure way to do so.
  
  constructor(private http: HttpClient) {
}

getLatest(): Observable<unknown> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('app_id', this.app_id);
    // Need to initialize DTOs and interface later
    const url = `${BASE_URL}/latest.json`;
    return this.http.get(url, { params: queryParams });
  }
}
