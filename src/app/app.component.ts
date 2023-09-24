import { Component } from '@angular/core';
import type { CarType, ModelType } from 'utils/types';
import {
  cars,
  dateIntervalError,
  zeroDateIntervalMessage,
  dropdownClassTitle,
  dropdownModelTitle,
} from 'utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cars = cars;
  selectedClass = dropdownClassTitle;
  selectedModel = dropdownModelTitle;
  models?: Array<ModelType> = [];
  selectedStartDate = '';
  selectedFinishDate = '';
  daysInterval = 0;
  priceForDay = 0;
  finalPrice = 0;
  dateIntervalError = '';
  rentCostForDay?: Record<string, number> = {
    shortRent: 0,
    averageRent: 0,
    longRent: 0,
  };

  changeClass(e: Event) {
    if (this.cars !== undefined && this.cars !== null && this.cars.length > 0) {
      const target = e.target as HTMLSelectElement;
      this.models = cars.find(({ name }: CarType) => name == target.value)?.models;
    }
  }

  changeModel(e: Event) {
    if (this.cars !== undefined && this.cars !== null && this.cars.length > 0) {
      const target = e.target as HTMLSelectElement;
      this.rentCostForDay = this.cars
        .find(({ name }: CarType) => name == this.selectedClass)
        ?.models.find(({ name }: ModelType) => name == target.value)?.rentCostForDay;
      this.findRentPrice();
      this.calculatePrice();
    }
  }

  selectStartDate(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.selectedStartDate = target.value;
    this.findRentPrice();
    this.calculatePrice();
  }
  selectFinishDate(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.selectedFinishDate = target.value;
    this.findRentPrice();
    this.calculatePrice();
  }

  findDaysInterval() {
    const date1 = new Date(this.selectedStartDate);
    const date2 = new Date(this.selectedFinishDate);

    let interval;

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      interval = 0;
    } else {
      interval = date2.getTime() - date1.getTime();
    }

    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    return daysInterval;
  }

  findRentPrice() {
    const daysInterval = this.findDaysInterval();

    if (isNaN(daysInterval) || daysInterval < 0) {
      this.daysInterval = 0;
    } else {
      this.daysInterval = daysInterval;
    }
    if (daysInterval < 0) {
      this.dateIntervalError = dateIntervalError;
      return;
    }
    if (!this.rentCostForDay) {
      return;
    }
    switch (true) {
      case daysInterval === 0:
        this.dateIntervalError = zeroDateIntervalMessage;
        break;
      case daysInterval === 1:
        this.priceForDay = this.rentCostForDay['shortRent'];
        break;
      case daysInterval <= 5:
        this.priceForDay = this.rentCostForDay['averageRent'];
        break;
      case daysInterval >= 6:
        this.priceForDay = this.rentCostForDay['longRent'];
        break;
    }

    this.dateIntervalError = '';
  }

  calculatePrice() {
    this.finalPrice = this.priceForDay * this.daysInterval;
  }
}
