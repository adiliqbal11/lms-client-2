import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchAnswerByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/answer/fetchById${id}`);
  return result as ServiceResponse;
};

export default fetchAnswerByIdHandler;
