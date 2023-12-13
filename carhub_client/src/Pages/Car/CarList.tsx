import React, { useState } from "react";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
  useGetCarByIdQuery,
  useGetCarssQuery,
} from "../../Apis/carApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { carModel } from "../../Interfaces";
import { useNavigate } from "react-router";
import { debounce } from "lodash";
function CarList() {
  const [deleteCar] = useDeleteCarMutation();

  const [search, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data, isLoading, refetch } = useGetCarssQuery({
    search: search,
    pageSize: pageSize,
    pageNumber: pageNumber,
  });
  const debouncedSearch = debounce(() => refetch(), 300);
  const navigate = useNavigate();
  const handleCarDelete = async (id: number) => {
    toast.promise(
      deleteCar(id),
      {
        pending: "Processing your request...",
        success: "Car Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setPageNumber(1);
    debouncedSearch();
  };
  const rightAlign = {
    textAlign: "right",
  };

  const handleCarXColorClick = (carId: number, carName: string) => {
    navigate(`/carXColor/carXColorupsert/${carId}`, {
      state: { carName, carId },
    });
  };
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Car List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/Car/carupsert")}
            >
              Add New Car
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="p">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <button className="btn btn-success" onClick={debouncedSearch}>
              Search
            </button>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-1">Name</div>
              <div className="col-2">brand</div>
              <div className="col-2">StratingPrice</div>
              <div className="col-2">CarXColor</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((car: carModel) => {
              return (
                <div className="row border" key={car.id}>
                  <div className="col-1">{car.name}</div>
                  <div className="col-2">{car.brand?.brandName}</div>
                  <div className="col-2">{car.startingPrice}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleCarXColorClick(car.id, car.name)}
                    >
                      CarXColor
                    </button>
                  </div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() => navigate("/car/carupsert/" + car.id)}
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCarDelete(car.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="pagination">
              <button
                className="btn btn-link"
                disabled={pageNumber === 1}
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Previous
              </button>
              <span> Page {pageNumber} </span>
              <button
                className="btn btn-link"
                disabled={data.result.length < pageSize}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CarList;
