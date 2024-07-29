import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSubjectByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/subject/fetchById/${id}`);
  return result as ServiceResponse;
};

export default fetchSubjectByIdHandler;
