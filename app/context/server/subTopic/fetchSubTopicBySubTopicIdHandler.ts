import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSubTopicBySubTopicIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/subTopic/fetchByTopicId/${id}`);
  return result as ServiceResponse;
};

export default fetchSubTopicBySubTopicIdHandler;
