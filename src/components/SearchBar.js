import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Image,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesAsync, setSelectedCountry } from "../redux/countries/countriesSlice";
import { getUniversitiesAsync } from "../redux/universities/universitiesSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [enteredCountry, setEnteredCountry] = useState("");
  const [inputValue, setInputValue] = useState("")
  useEffect(() => {
    dispatch(getCountriesAsync());
  }, [dispatch]);

  const countries = useSelector((state) => state.countries.items);

  const focusHandler = () => {
    setTimeout(() => {
      setIsFocused(true);
    }, 200);
  };
  const blurHandler = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };
  const inputChangeHandler = (e) => {
    setEnteredCountry(e.target.value);
    setInputValue(e.target.value)
  };
  const onClickHandler = (country,e) => {
    dispatch(setSelectedCountry(country))
    dispatch(getUniversitiesAsync(country.name))
    setInputValue('')
    e.preventDefault()
  };
  return (
    <div style={{ marginTop: 20 }}>
      <InputGroup onChange={inputChangeHandler} className="mb-3">
        <FormControl
          placeholder="Search a country"
          value={inputValue}
          aria-describedby="basic-addon2"
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      </InputGroup>
      <ListGroup style={{ marginBottom: "10px" }}>
        {countries && isFocused ? (
          <div
            style={{
              border: "1px solid black",
              maxHeight: "10rem",
              overflow: "auto",
            }}
          >
            {!enteredCountry
              ? countries.map((country) => (
                  <a href={"/#"}>
                    {" "}
                    <ListGroup.Item
                      onClick={(e) => onClickHandler(country,e)}
                      key={nanoid()}
                    >
                      <Image
                        border="1px solid"
                        width="20rem"
                        src={country.flag}
                        rounded
                      />{" "}
                      {country.name}
                    </ListGroup.Item>
                  </a>
                ))
              : countries
                  .filter((country) =>
                    country.name
                      .toLowerCase()
                      .includes(enteredCountry.toLowerCase())
                  )
                  .map((country) => (
                    <a href="/#">
                      {" "}
                      <ListGroup.Item onClick={(e)=>onClickHandler(country,e)} key={nanoid()}>
                        <Image
                          border="1px solid"
                          width="20rem"
                          src={country.flag}
                          rounded
                        />{" "}
                        {country.name}
                      </ListGroup.Item>
                    </a>
                  ))}
          </div>
        ) : (
          ""
        )}
      </ListGroup>
    </div>
  );
}
