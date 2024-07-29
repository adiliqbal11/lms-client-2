import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchQuestionByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/question/fetchById/${id}`);
  return result as ServiceResponse;
};

export default fetchQuestionByIdHandler;
