import { Paper, Stack, TextField } from "@mui/material"
import { IQuizColumn } from "../dataTypes/quizData"
import QuizCardNew from "./QuizCardNew"
import './QuizCardNew.css'
interface QuizColumnNewProps{
    quizColumn: IQuizColumn
    changePoints: (questionRow: number, increase: boolean) => void;
    changeQuestion: (questionIndex: number,newQuestion: string, newAnswer: string, changeAnswer: boolean) => void;
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
                    changeQuestion={(newQuestion: string, newAnswer: string, changeAnswer: boolean) => {props.changeQuestion(index,newQuestion,newAnswer,changeAnswer)}}
                    question={{...question}} 
                    changePoints={(increase: boolean) => {props.changePoints(index,increase)}}/>
            ))}
        </Stack>
    )
}

export default QuizColumnNew