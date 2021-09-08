import React, { useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUniversitiesAsync } from "../redux/universities/universitiesSlice";

export default function ListPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.universities.isLoading);
  const selectedCountry = useSelector(target=>target.countries.selectedCountry)
  useEffect(() => {
    dispatch(getUniversitiesAsync(selectedCountry.name));
  }, [dispatch]);

  const universities = useSelector((state) => state.universities.items);
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><img src={selectedCountry.flag}  style={{height:"41px",objectFit:"cover"}}/></th>
            <th>University Name</th>
            <th>Domain</th>
            <th>Web Page</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university) =>(
            <tr key={universities.indexOf(university)}>
              <td>{universities.indexOf(university) + 1}</td>
              <td>{university.name}</td>
              <td>{university.domains[0]}</td>
              <td>
                <a
                  style={{ textDecoration: "none" }}
                  href={university.web_pages[0]}
                  target="_blank"
                  rel="noreferrer"
                >
                  {university.web_pages[0]}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
