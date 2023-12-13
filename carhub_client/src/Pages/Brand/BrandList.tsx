import React from "react";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../Apis/brandApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { brandModel } from "../../Interfaces";
import { useNavigate } from "react-router";
function BrandList() {
  const [deleteBrand] = useDeleteBrandMutation();
  const { data, isLoading } = useGetBrandsQuery(null);
  const navigate = useNavigate();

  const handleBrandDelete = async (id: number) => {
    toast.promise(
      deleteBrand(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
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
            <h1 className="text-success">Brand List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/brand/brandupsert")}
            >
              Add New Menu Item
            </button>
          </div>
          <div className="bg-danger form-control text-center text-white h4">
            In demo, you will not be able to create/update or delete Menu Items!
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">BrandName</div>
              <div className="col-2">IsActive</div>
              <div className="col-1">IsDelete</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((brand: brandModel) => {
              return (
                <div className="row border" key={brand.id}>
                  <div className="col-1">
                    <img
                      src={brand.brandImage}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{brand.id}</div>
                  <div className="col-2">{brand.brandName}</div>
                  <div className="col-2">{brand.isActive?.valueOf()}</div>
                  <div className="col-1">{brand.isDelete?.valueOf()}</div>
                  
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/brand/brandupsert/" + brand.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleBrandDelete(brand.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default BrandList;
