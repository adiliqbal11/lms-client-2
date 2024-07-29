import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchReserveQuestionsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/exporter/fetch/download-history`);
  return result as ServiceResponse;
};

export default fetchReserveQuestionsHandler;
