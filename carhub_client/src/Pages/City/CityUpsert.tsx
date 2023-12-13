// import React, { useEffect, useState } from "react";
// import {
//   useCreateCityMutation,
//   useGetCityByIdQuery,
//   useUpdateCityMutation,
// } from "../../Apis/cityApi";

// import { useGetCountrysQuery } from "../../Apis/countryApi";
// import { useGetStatesByCountryIdQuery } from "../../Apis/stateApi"; 



// import { inputHelper, toastNotify } from "../../Helper";
// import { useNavigate, useParams } from "react-router-dom";
// import { MainLoader } from "../../Components/Page/Common";


// const cityData: { cityName: string; countryId?: number; stateId?: number  } = {
//   cityName: "",
//   countryId: undefined,
//   stateId: undefined,
//   // isActive: false,
// };

// function CityUpsert() {
//   const { id } = useParams();

//   const navigate = useNavigate();
//   const [cityInputs, setCityInputs] = useState(cityData);
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [createCity] = useCreateCityMutation();
//   const [updateCity] = useUpdateCityMutation();
//   const { data } = useGetCityByIdQuery(id);
//   const { data: countriesData } = useGetCountrysQuery(null);
//   const { data: statesData } = useGetStatesByCountryIdQuery(cityInputs.countryId || 0);

  


//   useEffect(() => {
//     if (id) {
//       if (data && data.result) {
//         const tempData = {
//           cityName: data.result.cityName,
//           countryId: data.result.countryId,
//           stateId: data.result.stateId,
//           isActive: data.result.isActive,
//         };
//         setCityInputs(tempData);
//         setIsChecked(tempData.isActive);
//       }
//     }
//   }, [id]);
  

  
//   const handleOnChange = () => {
//     setIsChecked(!isChecked);
//     // Update CityInputs with the new value of isActive
//     setCityInputs((prevData) => ({
//       ...prevData,
//       isActive: !isChecked,
//     }));
//   };

//   const handleCityInput = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const tempData = inputHelper(e, cityInputs);
//     setCityInputs(tempData);
//   };

//   const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const countryId = parseInt(e.target.value);
//     setCityInputs((prevData) => ({
//       ...prevData,
//       countryId,
//       stateId: undefined, // Reset state when country changes
//     }));
//   };

//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const stateId = parseInt(e.target.value);
//     setCityInputs((prevData) => ({
//       ...prevData,
//       stateId,
//     }));
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();

//     formData.append("CityName", cityInputs.cityName);
//     formData.append("IsActive", isChecked.toString());
//     formData.append("CountryId", cityInputs.countryId?.toString() || "");
//     formData.append("StateId", cityInputs.stateId?.toString() || "");

//     let response;

//     if (id) {
//       //update
//       formData.append("Id", id);
//       response = await updateCity({ data: formData, id });
//       toastNotify("City updated successfully", "success");
//     } else {
//       //create
//       response = await createCity(formData);
//       toastNotify("City created successfully", "success");
//     }

//     if (response) {
//       setLoading(false);
//       navigate("/city/citylist");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container border mt-5 p-5 bg-light">
//       {loading && <MainLoader />}
//       <h3 className=" px-2 text-success">{id ? "Edit City" : "Add City"}</h3>
//       <form method="post" onSubmit={handleSubmit}>
//         <div className="row mt-3">
//           <div className="col-md-7">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Name"
//               required
//               name="cityName"
//               value={cityInputs.cityName}
//               onChange={handleCityInput}
//             />


// <label htmlFor="country">Select Country</label>
//             <select
//               className="form-control"
//               name="countryId"
//               value={cityInputs.countryId}
//               onChange={(e) => handleCountryChange(e)}
//             >
//               <option value="">Select Country</option>
//               {countriesData?.result.map((country: any) => (
//                 <option key={country.id} value={country.id}>
//                   {country.countryName}
//                 </option>
//               ))}
//             </select>

//             <label htmlFor="state">Select State</label>
//             <select
//               className="form-control"
//               name="stateId"
//               value={cityInputs.stateId}
//               onChange={(e) => handleStateChange(e)}
//             >
//               <option value="">Select State</option>
//               {statesData?.result.map((state: any) => (
//                 <option key={state.id} value={state.id}>
//                   {state.stateName}
//                 </option>
//               ))}
//             </select>

        

//             <label htmlFor="checkbox">Is Active</label>
//             <input
//               className="form-check-input"
//               type="checkbox"
//               name="isActive"
//               value={isChecked.toString()}
//               checked={isChecked}
//               onChange={handleOnChange}
//             />

//             <div className="row">
//               <div className="col-6">
//                 <button
//                   type="submit"
//                   className="btn btn-success form-control mt-3"
//                 >
//                   {id ? "Update" : "Create"}
//                 </button>
//               </div>
//               <div className="col-6">
//                 <a
//                   onClick={() => navigate("/city/citylist")}
//                   className="btn btn-secondary form-control mt-3"
//                 >
//                   Back to City
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CityUpsert;


import React, { useEffect, useState } from "react";
import {
  useCreateCityMutation,
  useGetCityByIdQuery,
  useUpdateCityMutation,
} from "../../Apis/cityApi";
import { useGetCountrysQuery } from "../../Apis/countryApi";
import { useGetStatesByCountryIdQuery } from "../../Apis/stateApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const cityData: {
  cityName: string;
  countryId?: number;
  stateId?: number;
} = {
  cityName: "",
  countryId: undefined,
  stateId: undefined,
  // isActive: false,
};

function CityUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [cityInputs, setCityInputs] = useState(cityData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCity] = useCreateCityMutation();
  const [updateCity] = useUpdateCityMutation();
  const { data } = useGetCityByIdQuery(id);
  const { data: countriesData } = useGetCountrysQuery(null);
  const { data: statesData, refetch: refetchStates } = useGetStatesByCountryIdQuery(cityInputs.countryId || 0);

  useEffect(() => {
    if (id) {
      if (data && data.result) {
        const tempData = {
          cityName: data.result.cityName,
          countryId: data.result.countryId,
          stateId: data.result.stateId,
          isActive: data.result.isActive,
        };
        setCityInputs(tempData);
        setIsChecked(tempData.isActive);
      }
    }
  }, [id]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update CityInputs with the new value of isActive
    setCityInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleCityInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, cityInputs);
    setCityInputs(tempData);
  };

  // const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const countryId = parseInt(e.target.value);
  //   setCityInputs((prevData) => ({
  //     ...prevData,
  //     countryId,
  //     stateId: undefined, 
  //   }));
    
  // };
  // useEffect(() => {
  //   // Call refetchStates when countryId changes
  //   refetchStates();
  // }, [cityInputs.countryId, refetchStates]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = parseInt(e.target.value);
    setCityInputs((prevData) => ({
      ...prevData,
      countryId,
      stateId: undefined,
    }));

    // Reset the state dropdown when the country changes
    refetchStates();
  };
  

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = parseInt(e.target.value);
    setCityInputs((prevData) => ({
      ...prevData,
      stateId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("CityName", cityInputs.cityName);
    formData.append("IsActive", isChecked.toString());
    formData.append("CountryId", cityInputs.countryId?.toString() || "");
    formData.append("StateId", cityInputs.stateId?.toString() || "");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateCity({ data: formData, id });
      toastNotify("City updated successfully", "success");
    } else {
      //create
      response = await createCity(formData);
      toastNotify("City created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/city/citylist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit City" : "Add City"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="cityName"
              value={cityInputs.cityName}
              onChange={handleCityInput}
            />

            

          
            <label htmlFor="country">Select Country</label>
            <select
              className="form-control"
              name="countryId"
              value={cityInputs.countryId}
              onChange={(e) => handleCountryChange(e)}
            >
              <option value="">Select Country</option>
              {countriesData?.result.map((country: any) => (
                <option key={country.id} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>

            <select
        className="form-control"
        name="stateId"
        value={cityInputs.stateId || ''}
        onChange={(e) => handleStateChange(e)}
      >
        <option value="">Select State</option>

        {statesData && statesData.result && statesData.result.length > 0 ? (
          statesData.result.map((state: any) => (
            <option key={state.id} value={state.id}>
              {state.stateName}
            </option>
          ))
        ) : (
          <option value="" disabled>
            {statesData && statesData.result
              ? 'No states available for the selected country'
              : 'Loading...'}
          </option>
        )}
      </select>





            {/* <label htmlFor="state">Select State</label>
            <select
              className="form-control"
              name="stateId"
              value={cityInputs.stateId}
              onChange={(e) => handleStateChange(e)}
            >
              <option value="">Select State</option>
              
              {statesData?.result.map((state: any) => (
                <option key={state.id} value={state.id}>
                  {state.stateName}
                </option>
              ))
              }
              
            </select> */}

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              checked={isChecked}
              onChange={handleOnChange}
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
                  onClick={() => navigate("/city/citylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to City
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CityUpsert;
