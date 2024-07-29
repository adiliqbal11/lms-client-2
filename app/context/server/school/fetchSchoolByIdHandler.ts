import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSchoolByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/school/fetchById${id}`);
  return result as ServiceResponse;
};

export default fetchSchoolByIdHandler;
