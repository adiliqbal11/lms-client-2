import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchAnswersHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/answer/fetch`);
  return result as ServiceResponse;
};

export default fetchAnswersHandler;
