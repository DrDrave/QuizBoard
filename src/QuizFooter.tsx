import { Button, IconButton, Stack, TextField } from "@mui/material"
import { useState } from "react";
import { ITeam } from "./dataTypes/quizData"
import './QuizFooter.css'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

interface QuizFooterProps{
    teams: ITeam[] | null;
    addTeam: (name: string) => void;
}

function QuizFooter (props: QuizFooterProps){

    const handleClickAddTeam = () =>{
        setTmpNewTeam('')
    }

    const handleConfirmAddTeam = (name: string) =>{
        if(name !== ''){
            props.addTeam(name); 
            setTmpNewTeam(null)
        }
    }

    const handleCancleAddTeam = () => {
        setTmpNewTeam(null)
    }

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setTmpNewTeam(e.target.value)
    }

    const [tmpNewTeam,setTmpNewTeam] = useState<string | null>(null)

    return(
        <Stack className={'QuizFooterWrapper'} flexDirection={"row"} alignItems={'center'} gap={'15px'}>
            {props.teams?.map(team => (
                <h2>
                    {team.name}: {team.score}
                </h2>
            ))}
            {tmpNewTeam !== null ? 
                <Stack flexDirection={"row"} alignItems={'center'}>
                    <TextField variant={'standard'} value={tmpNewTeam} onChange={handleTextFieldChange}/>
                    <IconButton aria-label="delete" onClick={() => handleConfirmAddTeam(tmpNewTeam)}>
                        <CheckIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleCancleAddTeam}>
                        <ClearIcon/>
                    </IconButton>
                </Stack>                
            :null}
            <Button variant={"contained"} onClick={handleClickAddTeam}> Add Team</Button>
        </Stack>
    )
}

export default QuizFooter