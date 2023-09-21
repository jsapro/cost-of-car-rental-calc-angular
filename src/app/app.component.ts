import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cost-of-car-rental-calc-angular';

  selectedClass: string = '--Выберите класс авто--';
  models: Array<any> = [];

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
}
