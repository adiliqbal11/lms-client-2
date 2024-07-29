import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSubjectsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/subject/fetch`);
  return result as ServiceResponse;
};

export default fetchSubjectsHandler;
