import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateAnswerHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/answer/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateAnswerHandler;
