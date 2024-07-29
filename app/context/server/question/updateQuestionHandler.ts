import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateQuestionHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/question/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateQuestionHandler;
