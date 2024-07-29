
import { pageLoader , toasterData} from "../provider";
import { ApiResponse, ServiceResponse } from "../types";


const postAndPutRequest = async (method: string, data: {} | [], url: string, type = "direct" as string, contentType = "application/json" as string):Promise<ServiceResponse> => {
    try {
        const apiUrl = "http://localhost:4040/api/v1" + url as string;
        // const apiUrl = "http://192.168.18.13:4040/api/v1" + url as string;
        pageLoader?.setPageLoading(30);
        const response = await fetch(apiUrl, {
            method,
            headers: {
                'Content-Type': contentType,
                'Authorization': `${localStorage?.getItem("lms-token")}`
            },
            body: data ? JSON?.stringify(data) : undefined
        });
        pageLoader?.setPageLoading(50);
        const result = await response.json() as ApiResponse;
        pageLoader?.setPageLoading(80);
        if (response?.status === 401) {
            setTimeout(() => {
                toasterData?.setToaster({
                    severity: "error",
                    summary: "Un-authenticated!",
                    detail: "Session Expired! Please login again.",
                    life: 5000
                });
                localStorage?.clear();
                const baseUrl = window.location.origin;
                window.location.href = baseUrl + "/auth/login";
            }, 1500);
            return {} as ServiceResponse;
        } else {
            if (type === "direct") {
                if (result?.status) {
                    toasterData?.setToaster({
                        severity: "success",
                        summary: "Congratulations!",
                        detail: result?.message,
                        life: 3000
                    })
                    pageLoader?.setPrimeReactLoader(false);
                    pageLoader?.setPageLoading(100);
                } else {
                    toasterData?.setToaster({
                        severity: "warn",
                        summary: "Ops, Something Went Wrong, try again!",
                        detail: result?.message,
                        life: 3000
                    })
                    pageLoader?.setPrimeReactLoader(false);
                    pageLoader?.setPageLoading(100);
                } 
                return {} as ServiceResponse;
            } else if (type === "callback") {
                if (result?.status) {
                    pageLoader?.setPageLoading(100);
                    pageLoader?.setPrimeReactLoader(false);
                    return {
                        status: true,
                        result,
                    } as ServiceResponse;
                } else {
                    pageLoader?.setPageLoading(100);
                    pageLoader?.setPrimeReactLoader(false);
                    return {
                        status: false,
                        result,
                    } as ServiceResponse;
                } 

            } else {
                return {} as ServiceResponse;
            }
        }
    } catch (error: any) {
        if (type === "direct") {
            toasterData?.setToaster({
                severity: "error",
                summary: "Something Went Wrong!",
                detail: "Please try again later.",
                life: 5000
            });
            pageLoader?.setPrimeReactLoader(false);
            pageLoader?.setPageLoading(100);
            return {} as ServiceResponse;
        } else if (type === "callback") {
            pageLoader?.setPageLoading(100);
            pageLoader?.setPrimeReactLoader(false);
            return {
                status: false,
                result: {} as ApiResponse
            } as ServiceResponse;
        } else {
            return {} as ServiceResponse;
        }
    }
}
export default postAndPutRequest;