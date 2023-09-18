import { Component, OnInit } from '@angular/core';
import { ExchangeRateAPIService } from './api/api.service';
import { ConvertPayload } from './api/api.enum';
import { CurrencyConverterService } from './currency_converter/currency-conveter.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'currency-converter';
  isLoading = false;
  destory$ = new Subject();

  constructor(
    private exchangeRateAPIService: ExchangeRateAPIService,
    private currencyConverterService: CurrencyConverterService,
  ) {}

  ngOnInit(): void {
    this.currencyConverterService.isLoadingSubject$
      .pipe(takeUntil(this.destory$))
      .subscribe((value) => (this.isLoading = value));
  }

  ngOnDestroy(): void {
    this.destory$.next(null);
  }
}
