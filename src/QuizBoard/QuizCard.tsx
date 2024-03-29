import { Paper, Stack } from '@mui/material';
import React from 'react';
import { IQuestion } from '../dataTypes/quizData'
import './QuizCard.css'

interface QuizCardProps{
    question: IQuestion;
    setSelectedQuestionID: React.Dispatch<React.SetStateAction<number | null>>;
}

function QuizCard (props: QuizCardProps) {

    const handleClickCard = (id: number) =>{
        props.setSelectedQuestionID(id)
    }

    return(
        <Paper className={'QuizCard'} style={{ backgroundColor: props.question.finished? 'red !important' : ''}} elevation={props.question.finished? 0 : 8} onClick={(e) => {handleClickCard(props.question.id)}} >
            <Stack style={{height: '100%', justifyContent: 'center', visibility: props.question.finished? 'hidden' : 'visible'}}>
                    <h1 className={'QuizCardPoints'}>
                        {props.question.points}
                    </h1>   
            </Stack>
        </Paper>
    )
}

export default QuizCard