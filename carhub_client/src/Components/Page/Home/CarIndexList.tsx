import React, { useState, useEffect } from "react";
import { useGetCarsQuery } from "../../../Apis/carApi";
import { carModel } from "../../../Interfaces";
import CarIndex from "./CarIndex";
import { useDispatch } from "react-redux";
import { setCar } from "../../../Storage/Redux/carSlice";
import { MainLoader } from "../Common";

function CarIndexList() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allCars, setAllCars] = useState<carModel[]>([]);

  const dispatch = useDispatch();
  const search = "";

  const { data, isLoading } = useGetCarsQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllCars((prevCars) => [...prevCars, ...data.result]);
      setLoading(false);
      setHasMore(data.result.length > 0);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && hasMore) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isReachedScrollEnd) {
        setLoading(true);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    }
  };



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

      {allCars.length > 0 &&
        allCars.map((car: carModel, index: number) => (
          <CarIndex car={car} key={index} />
        ))}

      {loading && <MainLoader />}
      {!loading && !hasMore && <p>No more cars to load</p>}
    </div>
  );
}

export default CarIndexList;



