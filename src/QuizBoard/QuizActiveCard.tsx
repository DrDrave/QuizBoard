import { Button, LinearProgress, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IQuestion, ITeam, QuestionType } from "../dataTypes/quizData";
import './QuizActiveCard.css'
import QuizCardImageContent from "./QuizCardImageContent";
import QuizCardTextContent from "./QuizCardTextContent";
import QuizCardTextFlowContent from "./QuizCardTextFlowContent";

interface QuizActiveCardProps{
    question: IQuestion;
    setSelectedQuestionID: React.Dispatch<React.SetStateAction<number | null>>;
    teams: ITeam[] | null,
    addPoints: (name: string,points: number) => void;
    changeCardFinishStateByID: (id: number,finished: boolean) => void;
}

function QuizActiveCard (props: QuizActiveCardProps) {

    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const addPointsToTeam = (team: string | null, points: number | null, id: number) => {
        //If both are null then the question wasnt answered correctly and no one should get points
        if(points !== null && team !== null){
            props.addPoints(team,points);
        }
        props.setSelectedQuestionID(null);
        props.changeCardFinishStateByID(id,true)
    }

    let counter = 0;
    let timerinterval = useRef((null as unknown) as any);
  
    const [ms, setMs] = useState(counter);
  
    const timer = (start: any) => {
      if (start === true && counter >= 1) {
        timerinterval.current = setInterval(() => {
            setMs(counter); //When I remove this, the infinite loop disappears.
            counter += 100;
          //@ts-ignore
        }, [100]);
      } else {
        setMs(0);
      }
    };
  
    const pressingDown = (e: any) => {
      e.preventDefault();
      counter = 1;
      timer(true);
    };
  
    const notPressingDown = (e: any) => {
      e.preventDefault();
      timer(false);
      setMs(0);
      clearInterval(timerinterval.current);
    };

    //Those timer are a bit sketchy. The max value of the progress bar is at ms 200 but it needs about ms 700 to render as if the progressbar is finished
    useEffect(() =>{
        if(ms > 650){
            setShowAnswer(true)
            timer(false);
            setMs(0);
            clearInterval(timerinterval.current);
        }
    },[ms])
  
    const renderQuestion = (question: IQuestion, showAnswer: boolean) =>{
        if(question.questionType === QuestionType.text){
            return <QuizCardTextContent question={props.question} showAnswer={showAnswer}/>
        }else if(question.questionType === QuestionType.textFlow){
            return <QuizCardTextFlowContent question={props.question} showAnswer={showAnswer}/>
        }else if(question.questionType === QuestionType.image){
            return <QuizCardImageContent question={props.question} showAnswer={showAnswer}/>
        }
        return null
    }

    return(
        <Stack className={'QuizActiveCard'}>
            {showAnswer ? 
                <>
                    <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
                        {renderQuestion(props.question,true)}
                    </Stack>
                    <Stack flexDirection={'row'} className={'QuizActiveCardButtonWrapper'} alignItems={'center'} gap={'10px'}>
                        <h2>
                            Gewinner:
                        </h2>
                        {props.teams?.map(team => (
                            <Button variant="contained" onClick={() => {addPointsToTeam(team.name, props.question.points,props.question.id)}}>{team.name}</Button>
                        ))}
                        <Button variant="outlined" onClick={() => {addPointsToTeam(null, null,props.question.id);}}>Niemand</Button>
                    </Stack>
                </>
            :
                <>
                    <Stack justifyContent={'center'} className={'QuizActiveCardContentWrapper'} alignItems={'center'}>
                        {renderQuestion(props.question,false)}
                    </Stack>
                    <Stack className={'QuizActiveCardButtonWrapper'} gap={'3px'}>
                        <Button variant="contained" onMouseDown={pressingDown} onMouseUp={notPressingDown}>Show Answer</Button>
                        <LinearProgress variant="determinate" value={ms > 200 ? 100 : ms/2}/>
                    </Stack>
                </>
            }
            
        </Stack>
    )
}

export default QuizActiveCard