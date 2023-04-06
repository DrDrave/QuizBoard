import { Button, Stack } from "@mui/material"
import React, { useEffect } from "react";
import { IQuestion, QuestionType } from "../dataTypes/quizData";

interface QuizCardImageRevealContentProps{
    question: IQuestion;
    showAnswer: boolean;
}

function QuizCardImageRevealContent (props: QuizCardImageRevealContentProps) {



    const [rectCover,setRectCover] = React.useState<{rectID: number,x: number,y: number, width: number, height: number}[]>([])

    //creates rectCover at the start
    useEffect(() => {
        const numberOfRectVertical = 20
        const numberOfRectHoriziontal = 20
        
        let rectID = 0;

        let tmpRectCover = []

        for(let verticalNumber=0 ; verticalNumber < numberOfRectVertical ; verticalNumber++ ){
            for(let horizontalNumber=0 ; horizontalNumber < numberOfRectHoriziontal ; horizontalNumber++ ){
                const newRectWidth = 100 / numberOfRectHoriziontal 
                const newRectHeight = 100 / numberOfRectVertical 
                const newRectTop = newRectHeight * verticalNumber
                const newRectLeft = newRectWidth * horizontalNumber
                tmpRectCover.push({rectID: rectID,x: newRectLeft,y: newRectTop, width: newRectWidth, height: newRectHeight})
                rectID = rectID + 1
            }
        }

        setRectCover(tmpRectCover)
    },[])

    useEffect(() => {
        if(props.showAnswer){
            setRectCover([])
        }
    },[props.showAnswer])

    return(
        <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
            <div style={{height: '90%', position: 'relative'}}>
                <Stack justify-content={'center'} alignItems={'center'} height={'100%'} width={'100%'} flexDirection={'row'}>
                    {props.question.questionImage !== null ? 
                        <img src={props.question.questionImage} style={{maxHeight: '100%',maxWidth: '100%'}}/>
                    :null}
                </Stack>
                {rectCover.map(rect => (
                    <div style={{position: 'absolute', left: rect.x + '%', top: rect.y + '%', width: rect.width + '%', height: rect.height + '%', backgroundColor: 'lightblue'}}>
                    </div>
                    ))}
            </div>
            
            {props.showAnswer? 
                <h1>
                    {props.question.answer}
                </h1>
            : 
                <Button variant={'contained'} style={{marginTop: '10px'}} 
                    onClick={() => 
                        setRectCover(oldRectCover => {
                            let tmpOldRectCover = [...oldRectCover]
                            tmpOldRectCover.splice(Math.floor(Math.random()*oldRectCover.length), 1)
                            return tmpOldRectCover
                        })}>
                    Next Step</Button>}
        </Stack>
    )
}

export default QuizCardImageRevealContent