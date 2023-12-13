import { configureStore } from "@reduxjs/toolkit";
import { countryReducer } from "./countrySlice";
import { stateReducer } from "./stateSlice";
import { cityReducer } from "./citySlice";
import { cartypeReducer } from "./cartypeSlice";
import { brandReducer } from "./brandSlice";
import { carReducer } from "./carSlice";
import { colorReducer } from "./colorSlice";
import { carXColorReducer } from "./carXColorSlice";
import { featureTypeReducer } from "./featureTypeSlice";
import { featureReducer } from "./featureSlice";


import {
  countryApi,
  stateApi,
  cityApi,
  cartypeApi,
  brandApi,
  carApi,
  colorApi,
  carXColorApi,
  featureTypeApi,
  featureApi
} from "../../Apis";

const store = configureStore({
  reducer: {
    countryStore: countryReducer,
    stateStore: stateReducer,
    cityStore: cityReducer,
    cartypeStore: cartypeReducer,
    brandStore: brandReducer,
    carStore: carReducer,
    colorStore: colorReducer,
    carXColorStore: carXColorReducer,
    featureStore: featureReducer,
    featureType: featureTypeReducer,

    [countryApi.reducerPath]: countryApi.reducer,
    [stateApi.reducerPath]: stateApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [cartypeApi.reducerPath]: cartypeApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [carXColorApi.reducerPath]: carXColorApi.reducer,
    [featureTypeApi.reducerPath]: featureTypeApi.reducer,
    [featureApi.reducerPath]: featureApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countryApi.middleware)
      .concat(stateApi.middleware)
      .concat(cityApi.middleware)
      .concat(cartypeApi.middleware)
      .concat(brandApi.middleware)
      .concat(carApi.middleware)
      .concat(colorApi.middleware)
      .concat(carXColorApi.middleware)
      .concat(featureTypeApi.middleware)
      .concat(featureApi.middleware)
   
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
