import postAndPutRequest from "../../services/postAndPutRequest";
import { FetchQuestionForPaperResponse } from "../../types";

const fetchQuestionsForExportHandler = async (data:{} | [] , type:string = "direct") => {
  const result = await postAndPutRequest("POST", data, `/exporter/fetch/questions`, type);
  return result as FetchQuestionForPaperResponse;
};

export default fetchQuestionsForExportHandler;
