import { Component, OnInit } from '@angular/core';

type PriceTrackerTrip = {
  name: string;
  price: number;
  date: Date;
  description: string;
  id: string;
  oldPrices?: [
    {
      price: number;
      date: Date;
    }
  ];
};

@Component({
  selector: 'app-price-tracker',
  templateUrl: './price-tracker.component.html',
  styleUrls: ['./price-tracker.component.scss']
})
export class PriceTrackerComponent implements OnInit {
  priceTrackerTrips: PriceTrackerTrip[] | undefined;

  constructor() {}

  ngOnInit(): void {
    const priceTracker = JSON.parse(
      localStorage.getItem('priceTracker') ?? '[]'
    );

    if (priceTracker.length === 0) return;

    this.priceTrackerTrips = priceTracker;
  }
}
