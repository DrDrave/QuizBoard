import { Button, Stack } from "@mui/material"
import React from "react";
import { IQuestion } from "../dataTypes/quizData";

interface QuizCardTextFlowContentProps{
    question: IQuestion;
    showAnswer: boolean;
}

function QuizCardTextFlowContent (props: QuizCardTextFlowContentProps) {

    const [numberHints,setNumberHints] = React.useState<number>(0);

    return(
        <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
            {props.question.questionTextFlow !== null ?
                <div>
                    {props.question.questionTextFlow.map( (questionHint,index) => (
                        index < numberHints ?
                        <h1>{questionHint}</h1>
                        :
                        null
                    ))}
                    {numberHints < props.question.questionTextFlow.length ?
                    <Button variant="contained" onClick={() => setNumberHints(oldHints => oldHints+1)}>Next Hint</Button>
                    :null}
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

export default QuizCardTextFlowContent