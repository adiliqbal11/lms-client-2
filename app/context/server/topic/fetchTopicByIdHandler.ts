import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchTopicByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/topic/fetchById${id}`);
  return result as ServiceResponse;
};

export default fetchTopicByIdHandler;
