import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Citys"],
  endpoints: (builder) => ({
    getCitys: builder.query({
      query: () => ({
        url: "CityAPI/GetCitys",
      }),
      providesTags: ["Citys"],
    }),

    getCityById: builder.query({
      query: (id) => ({
        url: `CityAPI/GetCity/${id}`,
      }),
      providesTags: ["Citys"],
    }),

    createCity: builder.mutation({
      query: (data) => ({
        url: "CityAPI/CreateCity",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Citys"],
    }),

    updateCity: builder.mutation({
      query: ({ data, id }) => ({
        url: "CityAPI/UpdateCity/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Citys"],
    }),
    
    deleteCity: builder.mutation({
      query: (id) => ({
        url: "CityAPI/DeleteCity/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Citys"],
    }),
  }),
});

export const {
  useGetCitysQuery,
  useGetCityByIdQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = cityApi;
export default cityApi;
