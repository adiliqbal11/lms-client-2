import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateSubjectHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/subject/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateSubjectHandler;
