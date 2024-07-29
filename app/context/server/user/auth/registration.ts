import postAndPutRequest from "../../../services/postAndPutRequest";
import { ServiceResponse } from "../../../types";

const RegistrationHandler = async (data:{} | [], type:string= "direct") => {
  const result = await postAndPutRequest("POST", data, "/auth/registration", type);
  return result as ServiceResponse;
};

export default RegistrationHandler;
