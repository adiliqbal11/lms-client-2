import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const createSchoolHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/school/create", type);
  return result as ServiceResponse;
};

export default createSchoolHandler;
