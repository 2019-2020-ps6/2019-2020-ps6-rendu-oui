export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    urlImage?: string;
    label: string;
    answers: Answer[];
}
