import postAndPutRequest from "../../../services/postAndPutRequest";
import { ServiceResponse } from "../../../types";

const LoginHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, "/auth/login", type);
  return result as ServiceResponse;
};

export default LoginHandler;
