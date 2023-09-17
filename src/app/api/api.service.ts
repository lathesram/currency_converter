import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroments/environment';
import { Observable } from 'rxjs';
import { CurrencyName, LatestInfo } from './api.enum';

export const BASE_URL = 'https://openexchangerates.org/api/';
export const Urls = {
  get_currencies: 'currencies.json',
  get_converted_result: 'convert',
  get_latest_info: 'latest.json',
};

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateAPIService {
  private app_id = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<CurrencyName[]> {
    const params = new HttpParams();
    params.set('app_id', this.app_id);
    return this.http.get<CurrencyName[]>(`${BASE_URL}${Urls.get_currencies}`, {
      params,
    });
  }

  // Only available for the paid package
  // getConvertedResults(payload: ConvertPayload): Observable<string> {
  //   let params = new HttpParams();
  //   params = params.set('app_id', this.app_id);

  //   return this.http.get<string>(`${BASE_URL}${Urls.get_converted_result}/${payload.value}/${payload.from}/${payload.to}`, {
  //     params,
  //   });
  // }

  // Always returns USD as Base URL. FreePlan :-(
  getLatest(): Observable<unknown> {
    const params = new HttpParams().set('app_id', this.app_id);
    return this.http.get(`${BASE_URL}${Urls.get_latest_info}`, {
      params,
    });
  }
}
