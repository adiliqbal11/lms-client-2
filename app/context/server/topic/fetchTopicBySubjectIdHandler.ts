import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchTopicBySubjectIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/topic/fetchBySubjectId/${id}`);
  return result as ServiceResponse;
};

export default fetchTopicBySubjectIdHandler;
