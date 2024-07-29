import postAndPutRequest from "../../services/postAndPutRequest";
import { ServiceResponse } from "../../types";

const updateSubTopicHandler = async (data:{} | [] ,id:string, type:string = "direct") => {
  const result = await postAndPutRequest("PUT", data, `/subTopic/update/${id}`, type);
  return result as ServiceResponse;
};

export default updateSubTopicHandler;
