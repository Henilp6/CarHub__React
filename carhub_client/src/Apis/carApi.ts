import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({
    
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Cars"],
  
  endpoints: (builder) => ({
    getCars: builder.query({
      query: ({pageNum,search}) => ({
        url: "CarAPI/CarSearchByLazyLoading",
      
        
        method: "Get",
        params: {pageNum,search},
      }),
      providesTags: ["Cars"],
    }),
   
    getCarById: builder.query({
      query: (id) => ({
        url: `CarAPI/GetCar/${id}`,
      }),
      providesTags: ["Cars"],
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: "CarAPI/CreateCar",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    updateCar: builder.mutation({
      query: ({ data, id }) => ({
        url: "CarAPI/UpdateCar/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cars"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: "CarAPI/DeleteCar/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),
      getCarss: builder.query({
          query: ({ search, pageSize, pageNumber }) => ({
            url: "CarAPI/GetCars",
            method: "GET",
            params: { search, pageSize, pageNumber },
        }),
      
        providesTags: ["Cars"],
      }),
  }),
});
 
export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetCarssQuery,
} = carApi;
export default carApi;
