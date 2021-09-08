import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountriesAsync = createAsyncThunk(
  "countries,getCountriesAsync",
  async () => {
    const response = await axios.get("https://restcountries.eu/rest/v2/all");
    return await response.data;
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    items: [],
    selectedCountry: {
      name: "Turkey",
      topLevelDomain: [".tr"],
      alpha2Code: "TR",
      alpha3Code: "TUR",
      callingCodes: ["90"],
      capital: "Ankara",
      altSpellings: [
        "TR",
        "Turkiye",
        "Republic of Turkey",
        "Türkiye Cumhuriyeti",
      ],
      region: "Asia",
      subregion: "Western Asia",
      population: 78741053,
      latlng: [39.0, 35.0],
      demonym: "Turkish",
      area: 783562.0,
      gini: 39.0,
      timezones: ["UTC+03:00"],
      borders: ["ARM", "AZE", "BGR", "GEO", "GRC", "IRN", "IRQ", "SYR"],
      nativeName: "Türkiye",
      numericCode: "792",
      currencies: [{ code: "TRY", name: "Turkish lira", symbol: null }],
      languages: [
        {
          iso639_1: "tr",
          iso639_2: "tur",
          name: "Turkish",
          nativeName: "Türkçe",
        },
      ],
      translations: {
        de: "Türkei",
        es: "Turquía",
        fr: "Turquie",
        ja: "トルコ",
        it: "Turchia",
        br: "Turquia",
        pt: "Turquia",
        nl: "Turkije",
        hr: "Turska",
        fa: "ترکیه",
      },
      flag: "https://restcountries.eu/data/tur.svg",
      regionalBlocs: [],
      cioc: "TUR",
    },
  },
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: {
    //get countries
    [getCountriesAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
