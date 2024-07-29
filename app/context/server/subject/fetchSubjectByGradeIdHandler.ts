import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchSubjectByGradeIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/subject/fetchByGradeId/${id}`);
  return result as ServiceResponse;
};

export default fetchSubjectByGradeIdHandler;
