import { Stack } from "@mui/material"
import { IQuestion, QuestionType } from "../dataTypes/quizData";

interface QuizCardImageContentProps{
    question: IQuestion;
    showAnswer: boolean;
}

function QuizCardImageContent (props: QuizCardImageContentProps) {

    return(
        <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
            <div style={{height: '90%', position: 'relative'}}>
                <Stack justify-content={'center'} alignItems={'center'} height={'100%'} width={'100%'} flexDirection={'row'}>
                    {props.question.questionImage !== null ? 
                        <img src={props.question.questionImage} style={{maxHeight: '100%',maxWidth: '100%'}}/>
                    :null}
                </Stack>
            </div>
            {props.showAnswer? 
                <h1>
                    {props.question.answer}
                </h1>
            : null}
        </Stack>
    )
}

export default QuizCardImageContent