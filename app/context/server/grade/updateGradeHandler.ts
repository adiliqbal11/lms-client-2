import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateGradeHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/grade/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateGradeHandler;
