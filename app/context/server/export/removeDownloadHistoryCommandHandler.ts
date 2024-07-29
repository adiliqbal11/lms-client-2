import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const RemoveDownloadHistoryCommandHandler = async (id: string) => {
  const result = await getAndDeleteRequest("GET", `/exporter/removeDownloadHistory/${id}`);
  return result as ServiceResponse;
};

export default RemoveDownloadHistoryCommandHandler;
