import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UniversityService from "../../service/UniversityService";

const universityService = new UniversityService()


export const getUniversitiesAsync = createAsyncThunk(
  "universities/getUniversitiesAsync",
  async (country='Turkey') => {
    if(country==='United States of America'){
      const response = await universityService.getUniversitiesByCountry('United States')
    return await response.data;
    }
    if(country==='United Kingdom of Great Britain and Northern Ireland'){
      const response = await universityService.getUniversitiesByCountry('United Kingdom')
      return await response.data;
    }
    const response = await universityService.getUniversitiesByCountry(country)
    return await response.data;
  }
);

export const universitiesSlice = createSlice({
  name: "universities",
  initialState: {
    items: [],
    isLoading:false,

  },
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: {
    //get universities
    [getUniversitiesAsync.fulfilled]: (state, action) => {
      state.items = action.payload; //buradaki action response'dan dönen data ile ilgili
      state.isLoading=false
    },
    [getUniversitiesAsync.pending]: (state, action) => {
      state.isLoading=true //buradaki action response'dan dönen data ile ilgili
    },
  },
});

export const {} = universitiesSlice.actions;
export default universitiesSlice.reducer;
