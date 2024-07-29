import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSchoolsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/school/fetch`);
  return result as ServiceResponse;
};

export default fetchSchoolsHandler;
