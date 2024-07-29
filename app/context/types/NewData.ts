export interface NewSchool {
    isNewSchool: boolean;
    setIsNewSchool: (newToaster: boolean) => void;
}

export interface NewGrade {
    isNewGrade: boolean;
    setIsNewGrade: (newToaster: boolean) => void;
}

export interface NewSubject {
    isNewSubject: boolean;
    setIsNewSubject: (newToaster: boolean) => void;
}

export interface NewTopic {
    isNewTopic: boolean;
    setIsNewTopic: (newToaster: boolean) => void;
}

export interface NewSubTopic {
    isNewSubTopic: boolean;
    setIsNewSubTopic: (newToaster: boolean) => void;
}
export interface NewQuestion {
    isNewQuestion: boolean;
    setIsNewQuestion: (newToaster: boolean) => void;
}
export interface NewAnswer {
    isNewAnswer: boolean;
    setIsNewAnswer: (newToaster: boolean) => void;
}

export interface NewData {
   school:NewSchool,
   grade:NewGrade,
   subject:NewSubject,
   topic:NewTopic,
   subTopic:NewSubTopic,
   question:NewQuestion,
   answer:NewAnswer
}