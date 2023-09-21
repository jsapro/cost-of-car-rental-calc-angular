import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cost-of-car-rental-calc-angular';

  selectedClass: string = '--Выберите класс авто--';
  selectedModel: string = '--Выберите модель авто--';
  models: Array<any> = [];
  rentCostForDay: Record<string, number> = {
    shortRent: 0,
    averageRent: 0,
    longRent: 0,
  };
  selectedStartDate: string = '';
  selectedFinishDate: string = '';
  daysInterval: number = 0;
  priceForDay: number = 0;
  finalPrice: number = 0;

  cars: Array<any> = [
    {
      name: 'B',
      models: [
        {
          name: 'BMW X5',
          rentCostForDay: {
            shortRent: 10000,
            averageRent: 8000,
            longRent: 5000,
          },
        },

        {
          name: 'Nissan Quashkai',
          rentCostForDay: {
            shortRent: 9000,
            averageRent: 7000,
            longRent: 4500,
          },
        },
        {
          name: 'Ford Focus',
          rentCostForDay: {
            shortRent: 8000,
            averageRent: 6500,
            longRent: 4000,
          },
        },
      ],
    },

    {
      name: 'C',
      models: [
        {
          name: 'Ford Transit',
          rentCostForDay: {
            shortRent: 12000,
            averageRent: 10000,
            longRent: 8000,
          },
        },

        {
          name: 'Mercedes-Benz Sprinter',
          rentCostForDay: {
            shortRent: 13000,
            averageRent: 11000,
            longRent: 9000,
          },
        },
      ],
    },
  ];

  changeClass(car: any) {
    this.models = this.cars.find(
      (_car: any) => _car.name == car.target.value
    ).models;
  }

  changeModel(model: any) {
    this.rentCostForDay = this.cars
      .find((_model: any) => _model.name == this.selectedClass)
      .models.find((mdl: any) => mdl.name == model.target.value).rentCostForDay;
    this.findRentPrice();
    this.calculatePrice();
  }

  selectStartDate(e: any) {
    this.selectedStartDate = e.target.value;
    this.findRentPrice();
    this.calculatePrice()
  }
  selectFinishDate(e: any) {
    this.selectedFinishDate = e.target.value;
    this.findRentPrice();
    this.calculatePrice()
  }

  findRentPrice() {
    const date1 = new Date(this.selectedStartDate);
    const date2 = new Date(this.selectedFinishDate);

    const interval = date2.getTime() - date1.getTime();
    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    this.daysInterval = daysInterval;
    if (daysInterval < 0) {
      return;
    } else {
      if (daysInterval === 0) {
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
