import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const createSubTopicHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/subTopic/create", type);
  return result as ServiceResponse;
};
export default createSubTopicHandler;
