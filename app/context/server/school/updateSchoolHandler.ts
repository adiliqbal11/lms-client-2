import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateSchoolHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/school/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateSchoolHandler;
