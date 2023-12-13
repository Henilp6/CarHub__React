import featureTypeModel from "./featureTypeModel";

export default interface featureModelModel {
  id: number;
  name: string;
  featureTypeId?: number;
  featureType: featureTypeModel;
  }
