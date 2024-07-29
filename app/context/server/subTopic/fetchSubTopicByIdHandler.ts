import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSubTopicByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/subTopic/fetchById${id}`);
  return result as ServiceResponse;
};

export default fetchSubTopicByIdHandler;
