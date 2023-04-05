import { Stack } from "@mui/material"
import { IQuestion } from "../dataTypes/quizData";

interface QuizCardTextContentProps{
    question: IQuestion;
    showAnswer: boolean;
}

function QuizCardTextContent (props: QuizCardTextContentProps) {
    return(
        <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
            <h1>
                {props.question.questionText}
            </h1>
            {props.showAnswer? 
                <h1>
                    {props.question.answer}
                </h1>
            : null}
        </Stack>
    )
}

export default QuizCardTextContent