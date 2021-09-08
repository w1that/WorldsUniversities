import axios from "axios";

export default class UniversityService{
    getUniversitiesByCountry(countryName){
        return axios.get("http://universities.hipolabs.com/search?country="+countryName).then(response=>response)
    }
}