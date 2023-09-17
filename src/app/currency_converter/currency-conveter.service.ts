import { Injectable } from '@angular/core';
import { ExchangeRateAPIService } from '../api/api.service';
import { ConvertPayload } from '../api/api.enum';
import { Observable, distinctUntilChanged, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private exchangeRateAPIService: ExchangeRateAPIService) {}

  convert_currency(conversion_info: ConvertPayload): Observable<number | null> {
    return this.exchangeRateAPIService.getLatest().pipe(
      distinctUntilChanged(),
      tap((lastInfo: any) => console.log(lastInfo)),
      map((latestInfo: any) => {
        if (latestInfo?.base !== 'USD' && latestInfo.rates?.length > 0) {
          return null;
        }
        const fromValueToUSDConversion =
          Number(latestInfo.rates[conversion_info.from]) *
          Number(conversion_info.value);
        return (
          fromValueToUSDConversion *
          Number(latestInfo.rates[conversion_info.to])
        );
      }),
    );
  }
}
