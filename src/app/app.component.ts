import { Component } from '@angular/core';
import type { CarType, ModelType } from 'utils/types';
import { cars, dateIntervalError, zeroDateIntervalMessage } from 'utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cost-of-car-rental-calc-angular';
  cars = cars;
  selectedClass = '--Выберите класс авто--';
  selectedModel = '--Выберите модель авто--';
  models: Array<ModelType> = [];
  selectedStartDate = '';
  selectedFinishDate = '';
  daysInterval = 0;
  priceForDay = 0;
  finalPrice = 0;
  dateIntervalError = '';
  rentCostForDay: Record<string, number> = {
    shortRent: 0,
    averageRent: 0,
    longRent: 0,
  };

  changeClass(e: Event) {
    if (this.cars !== undefined && this.cars !== null && this.cars.length > 0) {
      const target = e.target as HTMLSelectElement;
      this.models = cars.find((_car) => _car.name == target.value).models;
    }
  }

  changeModel(e: Event) {
    if (this.cars !== undefined && this.cars !== null && this.cars.length > 0) {
      const target = e.target as HTMLSelectElement;
      this.rentCostForDay = this.cars
        .find((_model: any) => _model.name == this.selectedClass)
        .models.find((mdl: any) => mdl.name == target.value).rentCostForDay;
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

  findRentPrice() {
    const date1 = new Date(this.selectedStartDate);
    const date2 = new Date(this.selectedFinishDate);

    let interval;

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      interval = 0;
    } else {
      interval = date2.getTime() - date1.getTime();
    }

    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    if (isNaN(daysInterval) || daysInterval < 0) {
      this.daysInterval = 0;
    } else {
      this.daysInterval = daysInterval;
    }
    if (daysInterval < 0) {
      this.dateIntervalError = dateIntervalError;
      return;
    } else {
      this.dateIntervalError = '';

      if (daysInterval === 0) {
        this.dateIntervalError = zeroDateIntervalMessage;
        return;
      }
      if (daysInterval === 1) {
        this.priceForDay = this.rentCostForDay['shortRent'];
        return;
      }
      if (daysInterval <= 5) {
        this.priceForDay = this.rentCostForDay['averageRent'];
        return;
      }
      if (daysInterval >= 6) {
        this.priceForDay = this.rentCostForDay['longRent'];
        return;
      }
    }
  }

  calculatePrice() {
    this.finalPrice = this.priceForDay * this.daysInterval;
  }
}
