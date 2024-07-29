import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchGradeByIdHandler = async (id:string) => {
  const result = await getAndDeleteRequest("GET",`/grade/fetchById/${id}`);
  return result as ServiceResponse;
};

export default fetchGradeByIdHandler;
