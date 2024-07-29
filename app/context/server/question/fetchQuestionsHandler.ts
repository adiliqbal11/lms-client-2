import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchQuestionsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/question/fetch`);
  return result as ServiceResponse;
};

export default fetchQuestionsHandler;
