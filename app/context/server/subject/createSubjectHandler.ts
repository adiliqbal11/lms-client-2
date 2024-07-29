import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const createSubjectHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/subject/create", type);
  return result as ServiceResponse;
};
export default createSubjectHandler;
