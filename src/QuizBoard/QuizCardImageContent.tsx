import { Stack } from "@mui/material"
import { IQuestion, QuestionType } from "../dataTypes/quizData";

interface QuizCardImageContentProps{
    question: IQuestion;
    showAnswer: boolean;
}

function QuizCardImageContent (props: QuizCardImageContentProps) {

    return(
        <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
            {props.question.questionImage !== null ? 
                <img src={props.question.questionImage} style={{height: '50%'}}/>
            :null}
            {props.showAnswer? 
                <h1>
                    {props.question.answer}
                </h1>
            : null}
        </Stack>
    )
}

export default QuizCardImageContent