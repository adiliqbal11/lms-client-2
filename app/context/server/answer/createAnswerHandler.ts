import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const createAnswerHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/answer/create", type);
  return result as ServiceResponse;
};
export default createAnswerHandler;
