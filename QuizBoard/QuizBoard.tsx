import { Popover, Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { IQuizColumn, ITeam } from '../dataTypes/quizData'
import QuizActiveCard from './QuizActiveCard'
import './QuizBoard.css'
import QuizColumn from "./QuizColumn"

interface QuizBoardProps{
    teams: ITeam[] | null,
    addPoints: (name: string,points: number) => void;
    quizColumns: IQuizColumn[];
    changeCardFinishStateByID:  (id: number,finished: boolean) => void;
}

function QuizBoard (props: QuizBoardProps) {



    const [selectedQuestionID,setSelectedQuestionID] = useState<number|null>(null)
    const [questionCard,setQuestionCard] = useState<JSX.Element>(<></>)
    const quizBoardRef = useRef<HTMLDivElement | null>(null);
    const [quizBoardRefSize,setQuizBoardRefSize] = useState<{width: number,height: number,left: number,top: number}>({width: 0,height: 0,left: 0,top: 0});

    useEffect(() => {
        props.quizColumns.forEach(quizColumn => {
            if(quizColumn.questions){
                const currentQuestion = quizColumn.questions.find(question => {return question.id === selectedQuestionID})
                if(currentQuestion != undefined){
                    setQuestionCard(<QuizActiveCard question={currentQuestion} setSelectedQuestionID={setSelectedQuestionID} teams={props.teams} addPoints={props.addPoints} changeCardFinishStateByID={props.changeCardFinishStateByID}/>)
                }
            }            
        })
    },[selectedQuestionID])

    useEffect(() =>{
        if(quizBoardRef.current){
            setQuizBoardRefSize({width: quizBoardRef.current.getBoundingClientRect().width ,height: quizBoardRef.current.getBoundingClientRect().height,
                                left: quizBoardRef.current.getBoundingClientRect().left ,top: quizBoardRef.current.getBoundingClientRect().top})
        }
    },[quizBoardRef])

   
    return(
        <div className={"QuizBoard"} 
            ref={quizBoardRef}>
            <Popover
            open={selectedQuestionID!==null}
            onClose={() => {setSelectedQuestionID(null)}}
            anchorReference="anchorPosition"
            anchorPosition={{ top: quizBoardRefSize.top , left: quizBoardRefSize.left }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',    
            }}
            >
                <div style={{width: quizBoardRefSize.width , height: quizBoardRefSize.height}}>
                    {questionCard}
                </div>                
            </Popover>
            <Stack 
                className={"QuizBoardStack"}
                direction={'row'} 
                gap={'15px'}
                justifyContent="space-around">
                {props.quizColumns.map((quizColumn, index) => (
                    // <div key={index}>
                        <QuizColumn key={index} quizColumn={quizColumn} setSelectedQuestionID={setSelectedQuestionID}></QuizColumn>
                    // </div>                    
                ))}
            </Stack>
        </div>
    )
}

export default QuizBoard