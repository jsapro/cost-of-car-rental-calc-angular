import { CarType } from './types';

enum CarName {
  BMW_X5 = 'BMW X5',
  Nissan_Quashkai = 'Nissan Quashkai',
  Ford_Focus = 'Ford Focus',
  Ford_Transit = 'Ford Transit',
  MercedesBenz_Sprinter = 'Mercedes-Benz Sprinter',
}

const cars: Array<CarType> = [
  {
    name: 'B',
    models: [
      {
        name: CarName.BMW_X5,
        rentCostForDay: {
          shortRent: 10000,
          averageRent: 8000,
          longRent: 5000,
        },
      },

      {
        name: CarName.Nissan_Quashkai,
        rentCostForDay: {
          shortRent: 9000,
          averageRent: 7000,
          longRent: 4500,
        },
      },
      {
        name: CarName.Ford_Focus,
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
        name: CarName.Ford_Transit,
        rentCostForDay: {
          shortRent: 12000,
          averageRent: 10000,
          longRent: 8000,
        },
      },

      {
        name: CarName.MercedesBenz_Sprinter,
        rentCostForDay: {
          shortRent: 13000,
          averageRent: 11000,
          longRent: 9000,
        },
      },
    ],
  },
];

const dateIntervalError = 'Начальная дата должна быть раньше чем конечная';
const zeroDateIntervalMessage =
  'Аренда рассчитывается от 1 суток. Выберите подходящие даты';
const dropdownClassTitle = '--Выберите класс авто--';
const dropdownModelTitle = '--Выберите модель авто--';

export {
  cars,
  dateIntervalError,
  zeroDateIntervalMessage,
  dropdownClassTitle,
  dropdownModelTitle,
};
