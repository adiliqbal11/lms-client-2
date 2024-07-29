import { TableColumns } from "./components/Datatable/types";

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    joinDate: Date;
    exp: number;
    iat: number;
}
export interface School {
    id: string,
    type: string,
    grades: Grade[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}

export interface Grade {
    id: string,
    school: School,
    schoolId: string,
    schoolName: string,
    grade: string,
    subjects: Subject[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}

export interface Subject {
    id: string,
    grade: Grade,
    gradeId: string,
    gradeName: string,
    subject: string,
    topics: Topic[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}
export interface Topic {
    id: string,
    subject: Subject,
    subjectId: string,
    subjectName: string,
    topic: string,
    subTopics: SubTopic[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}

export interface SubTopic {
    id: string,
    topic: Topic,
    topicId: string,
    topicName: string,
    subTopic: string,
    questions: Question[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}

export interface Question {
    id: string,
    subTopic: SubTopic,
    subTopicId: string,
    subTopicName: string,
    question: string,
    type: QuestionType[]
    marks: number,
    questionImage:string;
    difficultyLevel: DifficultyLevel[]
    answers: Answer[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}
export interface Answer {
    id: string,
    question: Question,
    questionId: string,
    questionName: string,
    answer: string,
    sequenceNo: number,
    answerImage:string,
    isCorrect: string,
    difficultyLevel: string,
    type: QuestionType[]
    createdAt: string,
    updatedAt: string,
    additional:string,
    action?: React.ReactNode
}

export interface ExportAnswers {
    isPracticeMode: boolean;
    schoolId: string;
    gradeId: string;
    subjectId: string;
    topicId: string;
    subTopicId: string;
    mcqQuestionQuantity: number;
    mcqDifficultyLevel: DifficultyLevel;
    shortQuestionQuantity: number;
    shortQuestionDifficultyLevel: DifficultyLevel;
    longQuestionQuantity: number;
    longQuestionDifficultyLevel: DifficultyLevel;
    fillInTheBlanksQuantity: number;
    fillInTheBlanksDifficultyLevel: DifficultyLevel;
    multiFillInTheBlanksQuantity: number;
    multiFillInTheBlanksDifficultyLevel: DifficultyLevel;
    multipleShortQuantity: number;
    multipleShortDifficultyLevel: DifficultyLevel;
    sequenceQuantity: number;
    sequenceDifficultyLevel: DifficultyLevel;
    multipleTrueFalseQuantity: number;
    multipleTrueFalseDifficultyLevel: DifficultyLevel;
    multipleQuestionV2Quantity: number;
    multipleQuestionV2DifficultyLevel: DifficultyLevel;
    type: QuestionType[];
    MCQVisible: boolean;
    shortQuestionVisible: boolean;
    longQuestionVisible: boolean;
    fillInTheBlanksVisible:boolean;
    multiFillInTheBlanksVisible:boolean;
    multipleShortVisible:boolean;
    sequenceVisible:boolean;
    multipleTrueFalseVisible:boolean;
    multipleQuestionV2Visible:boolean;
    exportMode: string;
}


export interface ImportInput {
    schoolId: string,
    gradeId: string,
    subjectId: string,
    topicId: string,
    subTopicId: string,
    csvFile: File
}
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface ImportAnswers {
    subTopicId: string,
    csvFile: File
}
export interface Histories {
    id: string,
    exportType: string,
    question:Question,
    createdAt: string,
    action?: React.ReactNode

}
export interface DatatableWithSearchProps<T> {
    tableColumns: TableColumns[];
    data: T[];
    loading?: boolean;
}

export interface Toaster {
    severity: "success" | "info" | "warn" | "error";
    summary: string;
    detail: string;
    life?: number;

}

export enum QuestionType {
    MCQ = "MCQ",
    SHORT = "SHORT",
    LONG = "LONG"
}

export enum DifficultyLevel {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}


export interface SchoolDropdownProps {
    name: string;
    label: string;
}

export interface DashboardInsights {
    totalSchools: number;
    totalGrades: number;
    totalSubjects: number;
    totalTopics: number;
    totalSubTopics: number;
    totalQuestions: number;
    totalUsers: number;
}

export enum Role {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
}