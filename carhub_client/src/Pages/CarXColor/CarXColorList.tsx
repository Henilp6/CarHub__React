import React from "react";
import {
  useDeleteCarXColorMutation,
  useGetCarXColorsQuery,
} from "../../Apis/carXColorApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { carXColorModel } from "../../Interfaces";
import { useNavigate } from "react-router";
function CarXColorList() {
  const [deleteCarXColor] = useDeleteCarXColorMutation();
  const { data, isLoading } = useGetCarXColorsQuery(null);
  const navigate = useNavigate();

  const handleCarXColorDelete = async (id: number) => {
    toast.promise(
      deleteCarXColor(id),
      {
        pending: "Processing your request...",
        success: "CarXColor Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">CarXColor List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/carXColor/carXColorupsert")}
            >
              Add New CarXColor
            </button>
          </div>
         
          <div className="p-2">
            <div className="row border">
              <div className="col-4">Action</div>
            </div>

            {data.result.map((carXColor: carXColorModel) => {
              return (
                <div className="row border" key={carXColor.id}> 
              
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default CarXColorList;
