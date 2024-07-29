import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateTopicHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/topic/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateTopicHandler;
