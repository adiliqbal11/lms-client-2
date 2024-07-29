import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const createGradeHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/grade/create", type);
  return result as ServiceResponse;
};
export default createGradeHandler;
