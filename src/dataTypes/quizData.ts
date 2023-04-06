
export interface IQuizColumn{
    columName: string;
    questions: IQuestion[];
}

export interface IQuestion{
    id: number;
    questionType: QuestionType;
    questionText: string | null, 
    questionImage: string | null,
    questionTextFlow: string[] | null;
    answer: string;
    finished: boolean;
    points: number;
}

export enum QuestionType{
    text = 'text',
    textFlow = 'textFlow',
    //images will mostlikly also be saved as base64 strings
    image = 'image',
    audio = 'audio',
}


export interface ITeam{
    id: number;
    name: string;
    score: number;
}