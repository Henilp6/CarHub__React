import colorModel from "./colorModel"
import carModel from "./carModel";

export default interface carXColorModel {
  id: number;
  carId?: number;
  car?: carModel;
  colorId?: number;
  color?: colorModel;
}