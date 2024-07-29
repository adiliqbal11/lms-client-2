import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchGradesHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/grade/fetch`);
  return result as ServiceResponse;
};

export default fetchGradesHandler;
