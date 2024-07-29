import { Question } from "../../shared/types";

export interface ApiResponse {
    status: boolean;
    message: string;
    data: [] | {} | null;
}
export interface ServiceResponse {
    status: boolean,
    result:ApiResponse
}
export interface FetchQUestionPaperResponseData{
    mcqQuestion:Question[],
    shortQuestion:Question[],
    longQuestion:Question[],
    fillInTheBlanksQuestion:Question[],
    multiFillInTheBlanksQuestion:Question[],
    multipleShortQuestion:Question[],
    multipleTrueFalseQuestion:Question[],
    sequenceQuestion:Question[],
    multipleShortQuestionV2:Question[],
}
export interface FetchQuestionForPaperAPIResponse {
    status: boolean;
    message: string;
    data: FetchQUestionPaperResponseData | null;
}
export interface FetchQuestionForPaperResponse {
    status: boolean,
    result:FetchQuestionForPaperAPIResponse
}