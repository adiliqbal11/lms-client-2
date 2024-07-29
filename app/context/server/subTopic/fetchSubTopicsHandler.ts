import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSubTopicsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/subTopic/fetch`);
  return result as ServiceResponse;
};

export default fetchSubTopicsHandler;
