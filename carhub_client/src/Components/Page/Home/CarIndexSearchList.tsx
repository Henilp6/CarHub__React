import React, { useState, useEffect } from "react";
import { useGetCarsQuery } from "../../../Apis/carApi";
import { carModel } from "../../../Interfaces";
import { MainLoader } from "../Common";
import { useParams } from "react-router-dom";
import CarIndexSearch from "./CarIndexSearch";

function CarIndexSearchList() {
  const { search } = useParams();
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allCars, setAllCars] = useState<carModel[]>([]);
  const { data, isLoading } = useGetCarsQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllCars((prevCars) => [...prevCars, ...data.result]);
      setLoading(false);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && data && data.result && data.result.length > 0) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

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
  }, [loading, data]);

  useEffect(() => {
    // Reset the state when the search term changes
    setAllCars([]);
    setPageNum(0);
  }, [search]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

      {allCars.length > 0 &&
        allCars.map((car: carModel, index: number) => (
          <CarIndexSearch car={car} key={index} />
        ))}

      {loading && <MainLoader />}
      {loading && data && data.result && data.result.length === 0 && (
        <p>No more cars to load</p>
      )}
    </div>
  );
}

export default CarIndexSearchList;



// import React, { useState, useEffect } from "react";
// import { useGetCarsQuery } from "../../../Apis/carApi";
// import { carModel } from "../../../Interfaces";
// import { MainLoader } from "../Common";
// import { useParams } from "react-router-dom";
// import CarIndexSearch from "./CarIndexSearch";

// function CarIndexSearchList() {
//   const { search } = useParams();
//   const [pageNum, setPageNum] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [allCars, setAllCars] = useState<carModel[]>([]);
//   const { data, isLoading } = useGetCarsQuery({
//     pageNum,
//     search: search || "",
//   });

//   useEffect(() => {
//     if (!isLoading && data && data.result) {
//       // Reset the state when a new search is performed
//       if (pageNum === 0) {
//         setAllCars(data.result);
//       } else {
//         // Ensure unique cars by using Set
//         setAllCars((prevCars) => Array.from(new Set([...prevCars, ...data.result])));
//       }
//       setLoading(false);
//       setHasMore(data.result.length > 0);
//     }
//   }, [isLoading, data, pageNum, search]);

//   const handleScroll = () => {
//     if (!loading && hasMore) {
//       const isReachedScrollEnd =
//         window.innerHeight + window.scrollY >=
//         document.documentElement.scrollHeight - 100;

//       if (isReachedScrollEnd) {
//         setLoading(true);
//         setPageNum((prevPageNum) => prevPageNum + 1);
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [loading, hasMore]);

//   useEffect(() => {
//     // Reset the state when the search term changes
//     setAllCars([]);
//     setPageNum(0);
//   }, [search]);

//   if (isLoading) {
//     return <MainLoader />;
//   }

//   return (
//     <div className="container row">
//       <div className="my-3">
//         <ul className="nav w-100 d-flex justify-content-center"></ul>
//       </div>

//       {allCars.length > 0 &&
//         allCars.map((car: carModel, index: number) => (
//           <CarIndexSearch car={car} key={index} />
//         ))}

//       {loading && <MainLoader />}
//       {!loading && !hasMore && <p>No more cars to load</p>}
//     </div>
//   );
// }

// export default CarIndexSearchList;


