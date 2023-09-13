import { Component, OnInit } from '@angular/core';
import { ExchangeRateAPIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'currency-converter';

  constructor(private exchangeRateAPIService: ExchangeRateAPIService) {}

  ngOnInit(): void {
    this.exchangeRateAPIService
      .getLatest()
      .subscribe((value) => console.log(value));
  }
}
