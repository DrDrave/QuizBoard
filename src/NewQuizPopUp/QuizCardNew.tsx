import { IconButton, Paper, Stack, TextField } from "@mui/material";
import { IQuestion } from "../dataTypes/quizData";
import './QuizCardNew.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { memo } from "react";

interface QuizCardNewProps{
    question: IQuestion;
    changePoints: (increase: boolean) => void;
    changeQuestion: (newQuestion: string, newAnswer: string, changeAnswer: boolean) => void; 
}

function QuizCardNew (props: QuizCardNewProps) {
    return(
        <Paper elevation={8} className={'QuizCardNew'}>
            <Stack gap={'10px'} style={{height: '100%', width: '80%', marginLeft: 'auto', marginRight: 'auto'}} justifyContent={'center'}>
                <TextField 
                        //skip validation for now. as always :D 
                        //error={props.question.question === ''}
                        onChange={(e) => {props.changeQuestion(e.target.value,'',false)}}
                        value={props.question.question} label="Question" 
                        variant="outlined" size={'small'}/>
                <TextField 
                        error={props.question.answer === ''}
                        onChange={(e) => {props.changeQuestion('',e.target.value,true)}}
                        value={props.question.answer} label="Answer" 
                        variant="outlined" size={'small'}/>
                <Stack flexDirection={'row'} alignItems={'center'}>
                    points:
                    <Stack flexDirection={'row'} alignItems={'center'}>
                        <IconButton aria-label="add" onClick={() => props.changePoints(false)} size={'small'}>
                            <RemoveIcon/>
                        </IconButton>
                        {props.question.points}        
                        <IconButton aria-label="add" onClick={() => props.changePoints(true)} size={'small'}>
                            <AddIcon/>
                        </IconButton>
                    </Stack> 
                </Stack>
            </Stack>
        </Paper>
    )
}

const propEqualCheck = (prevProps: QuizCardNewProps, newProps: QuizCardNewProps) =>{
    if(prevProps.question.question === newProps.question.question 
        && prevProps.question.answer === newProps.question.answer 
        && prevProps.question.points === newProps.question.points){
            return true
    }else{
        return false
    }
}

export default memo(QuizCardNew,propEqualCheck);