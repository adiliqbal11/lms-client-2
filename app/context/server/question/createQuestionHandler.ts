import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const createQuestionHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/question/create", type);
  return result as ServiceResponse;
};
export default createQuestionHandler;
