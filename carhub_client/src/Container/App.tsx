import React, { useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  CountryList, CountryUpsert, 
  CarTypeList, CarTypeUpsert,
  BrandList, BrandUpsert, 
  CarList,CarUpsert,
  StateList,StateUpsert,
  CityList,CityUpsert,
  ColorList,ColorUpsert,
  CarXColorList,CarXColorUpsert, Home,
  
} from "../Pages";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { RootState } from "../Storage/Redux/store";
import FeatureList from "../Pages/Feature/FeatureList";
import FeatureUpsert from "../Pages/Feature/FeatureUpsert";
import { CarIndex, CarIndexSearchList} from "../Components/Page/Home";
import { CarIndexSearch} from "../Components/Page/Home";
import Search from "../Pages/Search";



function App() {
  
 

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search/:search" element={<Search />} />
          
          <Route path="/country/countrylist" element={<CountryList />} />
          <Route  path="/country/countryUpsert/:id" element={<CountryUpsert />} />
          <Route path="/country/countryUpsert" element={<CountryUpsert />} />

          <Route path="/state/statelist" element={<StateList />} />
          <Route  path="/state/stateUpsert/:id" element={<StateUpsert />} />
          <Route path="/state/stateUpsert" element={<StateUpsert />} />

          <Route path="/city/citylist" element={<CityList />} />
          <Route  path="/city/cityUpsert/:id" element={<CityUpsert />} />
          <Route path="/city/cityUpsert" element={<CityUpsert />} />

          <Route path="/cartype/cartypelist" element={<CarTypeList />} />
          <Route  path="/cartype/cartypeUpsert/:id" element={<CarTypeUpsert />} />
          <Route path="/cartype/cartypeUpsert" element={<CarTypeUpsert />} />

          <Route path="/brand/brandlist" element={<BrandList />} />
          <Route  path="/brand/brandUpsert/:id" element={<BrandUpsert />} />
          <Route path="/brand/brandUpsert" element={<BrandUpsert />} />

          <Route path="/car/carlist" element={<CarList />} />
          <Route  path="/car/carUpsert/:id" element={<CarUpsert />} />
          <Route path="/car/carUpsert" element={<CarUpsert />} />

          <Route path="/color/colorlist" element={<ColorList />} />
          <Route  path="/color/colorUpsert/:id" element={<ColorUpsert />} />
          <Route path="/color/colorUpsert" element={<ColorUpsert />} />

          <Route path="/carXColor/carXColorlist" element={<CarXColorList />} />
          <Route  path="/carXColor/carXColorUpsert/:carId" element={<CarXColorUpsert />} />
          <Route path="/carXColor/carXColorUpsert" element={<CarXColorUpsert />} />

          <Route path="/feature/featurelist" element={<FeatureList />} />
          <Route  path="/feature/featureUpsert/:id" element={<FeatureUpsert />} />
          <Route path="/feature/featureUpsert" element={<FeatureUpsert />} />

        
        
        

       
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

