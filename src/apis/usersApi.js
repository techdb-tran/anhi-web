import axios from "axios";
import { BE_URL } from "../../src/constants/config";

export const fetchInfoMe = async (email)=>{
    return await axios.get(`${BE_URL}users?email=${email}`);
};