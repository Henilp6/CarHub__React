import React, { useEffect, useState } from "react";
import {
  useCreateBrandMutation,
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
} from "../../Apis/brandApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";



const brandData: {
  brandName: string;
} = {
  brandName: "",
  // isActive: false,
};



function BrandUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [brandInputs, setBrandInputs] = useState(brandData);
  const [loading, setLoading] = useState(false);
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const { data } = useGetBrandByIdQuery(id);
  const [isChecked , setIsChecked] = useState(false);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        brandName: data.result.brandName,
        isActive: data.result.isActive,
      };
      setBrandInputs(tempData);
      setIsChecked(tempData.isActive);
      setImageToDisplay(data.result.image);
    }
  }, [data]);


  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setBrandInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleBrandInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, brandInputs);
    setBrandInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("BrandName", brandInputs.brandName);
    // formData.append("BrandImage", brandInputs.brandImage);
    formData.append("IsActive", isChecked.toString());
    if (imageToStore) formData.append("BrandImage", imageToStore);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateBrand({ data: formData, id });
      toastNotify("Brand updated successfully", "success");
    } else {
      //create
      response = await createBrand(formData);
      toastNotify("Brandcreated successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/brand/brandlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h3>
     
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="brandName"
              value={brandInputs.brandName}
              onChange={handleBrandInput}
            />
             <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              // checked={stateInputs.isActive}
              // onChange={handlestateInput}
              checked={isChecked}
              onChange={handleOnChange}
            />
           
          
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/brand/brandlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Brand
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BrandUpsert;
