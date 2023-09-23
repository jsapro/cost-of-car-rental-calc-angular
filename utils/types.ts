export interface CarType {
  name: string;
  models: ModelType[];
};

export interface ModelType  {
  name: string,
  rentCostForDay: {
    shortRent: number,
    averageRent: number,
    longRent: number,
  },
}
