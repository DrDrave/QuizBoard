import { Stack } from "@mui/material"
import { IQuestion, QuestionType } from "../dataTypes/quizData";

interface QuizCardAudioContentProps{
    question: IQuestion;
    showAnswer: boolean;
}

function QuizCardAudioContent (props: QuizCardAudioContentProps) {

    return(
        <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
            {props.question.questionText !== null ? 
                <div>
                    <audio src={props.question.questionText} controls />
                </div>
            :null}
            {props.showAnswer? 
                <h1>
                    {props.question.answer}
                </h1>
            : null}
        </Stack>
    )
}

export default QuizCardAudioContent