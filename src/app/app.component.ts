import { Component, OnInit } from '@angular/core';
import { ExchangeRateAPIService } from './api/api.service';
import { ConvertPayload } from './api/api.enum';
import { CurrencyConverterService } from './currency_converter/currency-conveter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'currency-converter';

  constructor(private exchangeRateAPIService: ExchangeRateAPIService, private currencyConverterService: CurrencyConverterService) {}

  ngOnInit(): void {
    // This is only to test the function. Remove Below.

    this.exchangeRateAPIService.getCurrencies().subscribe((value) => {
      console.log(value);
    });

    const payload: ConvertPayload = {
      to: 'GBP',
      from: 'EUR',
      value: '100',
    };

    // this.exchangeRateAPIService
    //   .getConvertedResults(payload)
    //   .subscribe((value) => console.log(value));

    this.exchangeRateAPIService.getLatest().subscribe(value => console.log(value));
    this.currencyConverterService.convert_currency(payload).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
