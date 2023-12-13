import carModel from "./carModel";
import carXColorModel from "./carXColorModel";
import colorlistVM from "./colorlistVM";

export default interface carXColorVMModel {

        carXColor: carXColorModel;
        car: carModel;
        colorList: colorlistVM;
        carXColorList: carXColorModel[];
  }