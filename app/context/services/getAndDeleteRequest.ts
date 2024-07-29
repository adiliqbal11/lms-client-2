import { pageLoader, toasterData } from "../provider";
import { ApiResponse, ServiceResponse } from "../types";


const getAndDeleteRequest = async (method: string, url: string, contentType = "application/json" as string):Promise<ServiceResponse> => {
  try {
    const apiUrl = "http://localhost:4040/api/v1" + url as string;
    // const apiUrl = "http://192.168.18.13:4040/api/v1" + url as string;
    pageLoader.setPageLoading(30);
    pageLoader.setPrimeReactLoader(true);
    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        Authorization: `${localStorage.getItem("lms-token")}`,
        "Content-Type": contentType,
      },
    });
    if (response.status == 401) {
      setTimeout(() => {
        localStorage.clear();
        const baseUrl = window.location.origin;
        window.location.href = baseUrl + "/auth/login";
      }, 1500);
      return {} as ServiceResponse;
    }
    const result = await response.json()as ApiResponse;
    pageLoader.setPrimeReactLoader(false);
    pageLoader.setPageLoading(100);
    return {
      status: true,
      result,
    } as ServiceResponse;
  } catch (error:any) {
    pageLoader.setPrimeReactLoader(false);
    pageLoader.setPageLoading(100);
    toasterData?.setToaster({
      severity: "error",
      summary: "Something Went Wrong!",
      detail: "Please try again later.",
      life: 5000
  });
    return {
      status: false,
      result: {} as ApiResponse ,
    };
  }
};
export default getAndDeleteRequest;
