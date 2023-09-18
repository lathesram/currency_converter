import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConvertPayload, CurrencyName } from 'src/app/api/api.enum';
import { ExchangeRateAPIService } from 'src/app/api/api.service';
import { CurrencyConverterService } from '../currency-conveter.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  isLoading = false;

  currencyList: CurrencyName[] = [];

  currencyConverterForm = new FormGroup({
    fromCurrency: new FormControl('', Validators.required),
    toCurrency: new FormControl('', Validators.required),
    fromAmount: new FormControl('', Validators.required),
  });

  constructor(
    private exchangeRateAPIService: ExchangeRateAPIService,
    private currencyConverterService: CurrencyConverterService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currencyConverterForm.valueChanges.subscribe((value) => {
      if (this.currencyConverterForm.valid) {
        const convertPayload: ConvertPayload = {
          to: value.toCurrency ?? '',
          from: value.fromCurrency ?? '',
          value: value.fromAmount ?? '',
        };

        this.currencyConverterService
          .convert_currency(convertPayload)
          .pipe(
            debounceTime(5000),
            distinctUntilChanged(),
            map((value) => value?.toFixed(2)),
          )
          .subscribe((value) => {
            this.openSnackBar(`The converted Amount is ${value}`);
          });
      }
    });

    this.exchangeRateAPIService
      .getCurrencies()
      .pipe(
        map((value: any) => {
          const keys: string[] = Object.keys(value);
          const values: string[] = Object.values(value);
          const rates: CurrencyName[] = [];

          keys?.forEach((key, index) => {
            rates.push({
              shortHand: key,
              name: values[index],
            });
          });

          return rates;
        }),
        tap((value) => console.log(value)),
      )
      .subscribe((value) => {
        this.currencyList = value;
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000
    });
  }
}
