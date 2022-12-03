import { IconButton, Stack } from '@mui/material'
import { useState } from 'react';
import { IQuestion, IQuizColumn, ITeam } from './dataTypes/quizData';
import QuizBoard from './QuizBoard/QuizBoard'
import { quizColumnsMockData } from './mockData/createQuizInfo'
import './QuizContainer.css'
import QuizFooter from './QuizFooter';
import AddIcon from '@mui/icons-material/Add';
import QuizCreateNew from './NewQuizPopUp/QuizCreateNew';

/**
 * TODO 
 * 
 * GitHub Page draus machen
 * NewQuizBoard scrollbar
 * Naming
 * Multiple Options for answer
 * If lastRow is removed this also happens for the current Quiz
 * Tutorial 
 * 
 */

function QuizContainer () {

    const [teams, setTeams] = useState<ITeam[]|null>(null);
    const [createNewQuiz,setCreateNewQuiz] = useState<boolean>(false);
    const [quizColumns,setQuizColumns] = useState<IQuizColumn[]>(quizColumnsMockData)

    const highestIDinTeams = (tmpTeams: ITeam[]) =>{
        let highestID = 0;
        tmpTeams.forEach(team =>{
            if(team.id > highestID){
                highestID = team.id
            }
        })
        return highestID
    }

    const addTeam = (name: string) => {
        setTeams(prevState => {if(prevState){
            return [...prevState,{id: highestIDinTeams(prevState),name: name,score: 0}]
        }else{
            return [{id: 0,name: name,score: 0}]
        }})
    }

    const addPoints = (name: string, points: number) => {
        setTeams(prevState => {
            if(prevState){
                const tmpTeams = [...prevState]
                const teamIndex = tmpTeams.findIndex(team => (team.name === name))
                tmpTeams[teamIndex].score = tmpTeams[teamIndex].score + points
                return tmpTeams
            }else{
                return null
            }          
        })
    }

    const changeCardFinishStateByID = (id: number,finished: boolean) =>{
        setQuizColumns(prevState => {
            const tmpQuizColumns = [...prevState]
            tmpQuizColumns.forEach(quizColumn => {
                quizColumn.questions.forEach((question: IQuestion )=>{
                    if(question.id === id){
                        question.finished = finished
                    }
                })
            })
            return tmpQuizColumns
        })
    }

    const saveNewQuiz = (newQuiz: IQuizColumn[]) =>{
        setQuizColumns(newQuiz)
    }

    return (
        <Stack className={"QuizContainer"}> 
            <div style={{height: '60px'}}> 
                <Stack flexDirection="row" justifyContent={'center'}>
                    <h1 style={{margin: '8px'}}>
                        Jeopardy with Friends
                    </h1>
                    <IconButton aria-label="add" onClick={() => {setCreateNewQuiz(true)}}>
                            <AddIcon/>
                    </IconButton>
                </Stack>
            </div>  
            <QuizCreateNew 
                    saveNewQuiz={saveNewQuiz}
                    createNewQuiz={createNewQuiz} closeWindow={() => {setCreateNewQuiz(false)}} 
                    currentQuizColumns={quizColumns}/>
            <QuizBoard 
                    teams={teams} addPoints={addPoints} 
                    changeCardFinishStateByID={changeCardFinishStateByID} 
                    quizColumns={quizColumns}/>
            <QuizFooter 
                    teams={teams} addTeam={addTeam}/>
        </Stack>
    )
}

export default QuizContainer