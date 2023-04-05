import { Paper, Stack, TextField } from "@mui/material"
import { IQuizColumn, QuestionType } from "../dataTypes/quizData"
import QuizCardNew from "./QuizCardNew"
import './QuizCardNew.css'
interface QuizColumnNewProps{
    quizColumn: IQuizColumn
    changePoints: (questionRow: number, increase: boolean) => void;
    changeQuestion: (questionIndex: number, newAnswer: string, changeAnswer: boolean, newQuestionType: QuestionType | null , newQuestionTextFlow?: string[], newQuestionImage?: string ,newQuestionText?: string) => void;
    changeCategory: (newCategory: string) => void;
    lastColumn: boolean;
}

function QuizColumnNew (props: QuizColumnNewProps) {
    return(
        <Stack gap={'5px'}>
            <Paper className={'QuizCardNew'} elevation={8}>
                <Stack gap={'10px'} style={{height: '100%', width: '80%', marginLeft: 'auto', marginRight: 'auto'}} justifyContent={'center'}>
                        <TextField 
                                onChange={(e) => {props.changeCategory(e.target.value)}}
                                error={props.quizColumn.columName === ''}
                                value={props.quizColumn.columName} label="Category" 
                                variant="outlined" />
                </Stack>
            </Paper>
            {props.quizColumn.questions.map((question, index) => (
                <QuizCardNew 
                    key={index}
                    changeQuestion={(newAnswer: string, changeAnswer: boolean, newQuestionType: QuestionType | null , newQuestionTextFlow?: string[], newQuestionImage?: string ,newQuestionText?: string) => {props.changeQuestion(index,newAnswer,changeAnswer,newQuestionType, newQuestionTextFlow, newQuestionImage,newQuestionText)}}
                    question={{...question}} 
                    changePoints={(increase: boolean) => {props.changePoints(index,increase)}}/>
            ))}
        </Stack>
    )
}

export default QuizColumnNew