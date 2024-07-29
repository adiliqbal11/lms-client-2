import getAndDeleteRequest from "../../services/getAndDeleteRequest";
import { ServiceResponse } from "../../types";

const fetchDashboardInsightsHandler = async () => {
  const result = await getAndDeleteRequest("GET",`/insights/fetchDashboardInsights`);
  return result as ServiceResponse;
};

export default fetchDashboardInsightsHandler;
