import { ImportInput } from "../../../shared/types";
import { pageLoader } from "../../provider";

const importsHandler = async (data:ImportInput , csvFile:File) => {
  try {
    pageLoader?.setPageLoading(30);
    const url = "/imports/csvImport";
    const apiUrl = "http://localhost:4040/api/v1" + url as string;
    const formData = new FormData();
    formData?.append("file", csvFile);
    formData?.append("subTopicId", data?.subTopicId);
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
    pageLoader?.setPageLoading(50);
    if (!response.ok) {
      return { status: false, message: 'Upload failed', data: null };
    }
    pageLoader?.setPageLoading(80);
    const result = await response.json();
    pageLoader?.setPageLoading(100);
    return result
  } catch (error) {
    pageLoader?.setPageLoading(100);
    return { status: false, message: 'Upload failed', data: null };
  }
};
export default importsHandler;
