
export interface IQuizColumn{
    columName: string;
    questions: IQuestion[];
}

export interface IQuestion{
    id: number;
    question: string;
    answer: string;
    finished: boolean;
    points: number;
}

export interface ITeam{
    id: number;
    name: string;
    score: number;
}