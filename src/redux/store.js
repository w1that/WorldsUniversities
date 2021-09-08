import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./countries/countriesSlice";
import universitiesSlice from "./universities/universitiesSlice";

export const store = configureStore({
    reducer:{
        universities : universitiesSlice,
        countries:countriesSlice,
        
    }
})