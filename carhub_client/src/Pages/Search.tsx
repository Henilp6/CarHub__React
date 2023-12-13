import React from "react";
import { CarIndexSearchList } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";
import { useState, useEffect } from "react";

function Search() {
  return (
    <div>  
      <div className="container p-2">
        <CarIndexSearchList />
      </div>
    </div>
  );
}

export default Search;

