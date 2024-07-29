import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchGradeBySchoolIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/grade/fetchBySchoolId/${id}`);
  return result as ServiceResponse;
};

export default fetchGradeBySchoolIdHandler;
