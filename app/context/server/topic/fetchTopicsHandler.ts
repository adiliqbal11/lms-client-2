import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchTopicsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/topic/fetch`);
  return result as ServiceResponse;
};

export default fetchTopicsHandler;
