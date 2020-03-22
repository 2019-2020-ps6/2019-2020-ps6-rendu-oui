export interface Answer {
    id?: string;
    type?: string;
    value: string;
    isCorrect: boolean;
    questionId?: string;
}

export interface Question {
    id?: string;
    label: string;
    answers: Answer[];
    quizId?: string;
}
