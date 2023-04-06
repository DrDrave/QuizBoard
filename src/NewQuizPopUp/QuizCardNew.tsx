import { Button, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { IQuestion, QuestionType } from "../dataTypes/quizData";
import './QuizCardNew.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { memo, useEffect, useState } from "react";
import React from "react";

interface QuizCardNewProps{
    question: IQuestion;
    changePoints: (increase: boolean) => void;
    changeQuestion: (newAnswer: string, changeAnswer: boolean, newQuestionType: QuestionType | null , newQuestionTextFlow?: string[], newQuestionImage?: string ,newQuestionText?: string) => void; 
}

function QuizCardNew (props: QuizCardNewProps) {

    const [questionType, setQuestionType] = React.useState<QuestionType>(props.question.questionType?? QuestionType.text)

    const handleSelectChange = (event: SelectChangeEvent) =>{
        setQuestionType(event.target.value as QuestionType)
        props.changeQuestion('',false,event.target.value as QuestionType)
    }

    const [image, setImage] = useState<String | ArrayBuffer | null>(props.question.questionImage?? null);
    const [hints, setHints] = useState<string[]>(props.question.questionTextFlow?? ['']);

    useEffect(() => {
        props.changeQuestion('',false ,null,hints, undefined, undefined)
    },[hints])

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
        setImage(reader.result);
        props.changeQuestion('',false ,null,undefined, reader.result as string, undefined)
        };
        reader.readAsDataURL(file);
    };

    const handleHintChange = (newHint: string, index: number) => {
        setHints(oldHints => {
            let tmpHints = oldHints
            tmpHints[index] = newHint
            return tmpHints})
    }

    const renderQuestionEdit = () =>{
        if(questionType === QuestionType.text){
            return <TextField 
                    //skip validation for now. as always :D 
                    //error={props.question.question === ''}
                    onChange={(e) => {props.changeQuestion('',false ,null,undefined, undefined, e.target.value)}}
                    value={props.question.questionText} label="Question" 
                    variant="outlined" size={'small'}/>
        }
        else if(questionType === QuestionType.textFlow){
            return <>
                        <Button variant="contained" 
                            onClick={() => 
                                setHints(oldHints => 
                                    {
                                        const tmpHints = [...oldHints]
                                        tmpHints.pop()
                                        if(tmpHints !== undefined){
                                            return tmpHints
                                        }else{
                                            return ['']
                                        }})
                                }>Remove Hint</Button>
                        {hints.map((hint,index) => (
                            <TextField 
                            // onChange={(e) => {props.changeQuestion('',false ,null, [e.target.value], undefined, undefined)}}
                            onChange={(e) => {handleHintChange(e.target.value,index)}}
                            value={hint[index]} label="Question" 
                            variant="outlined" size={'small'}/>))}
                        <Button variant="contained" onClick={() => setHints(oldHints => [...oldHints,''])}>Add Hint</Button>
                    </>
        }
        else if(questionType === QuestionType.image || questionType === QuestionType.imageReveal){
            return  <input type="file" accept="image/*" onChange={handleImageChange} />
        }
        else if(questionType === QuestionType.audio){
            return  <>
                        <div>
                            <input type="file" accept="audio/*" onChange={handleFileUpload} />
                        </div>
                        <div>
                            <audio src={audioSrc} controls />
                        </div>
                    </>
        }
        return null
    }

    const [audioSrc, setAudioSrc] = useState(props.question.questionType === QuestionType.audio && props.question.questionText !== null ? props.question.questionText : '');

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            if(event && event.target && event.target.result){
                const audioSrc = event.target.result;
                setAudioSrc(audioSrc as string)
                props.changeQuestion('',false ,null,undefined, undefined, audioSrc as string)
            }
            // set the audio source as a state variable
        };
      }

    return(
        <Paper elevation={8} className={'QuizCardNew'}>
            <Stack gap={'10px'} style={{height: '100%', width: '80%', marginLeft: 'auto', marginRight: 'auto'}} justifyContent={'center'}>
                <Select
                    value={questionType}
                    onChange={handleSelectChange}>
                    <MenuItem value={QuestionType.text}>Text</MenuItem>
                    <MenuItem value={QuestionType.textFlow}>TextFlow</MenuItem>
                    <MenuItem value={QuestionType.image}>Image</MenuItem>
                    <MenuItem value={QuestionType.audio}>Audio</MenuItem>
                    <MenuItem value={QuestionType.imageReveal}>ImageReveal</MenuItem>
                </Select>
                {renderQuestionEdit()}
                <TextField 
                        error={props.question.answer === ''}
                        onChange={(e) => {props.changeQuestion(e.target.value,true,null)}}
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

export default QuizCardNew;

//memo is not needed now i think
// const propEqualCheck = (prevProps: QuizCardNewProps, newProps: QuizCardNewProps) =>{
//     if(prevProps.question.question === newProps.question.question 
//         && prevProps.question.answer === newProps.question.answer 
//         && prevProps.question.points === newProps.question.points){
//             return true
//     }else{
//         return false
//     }
// }

// export default memo(QuizCardNew,propEqualCheck);

