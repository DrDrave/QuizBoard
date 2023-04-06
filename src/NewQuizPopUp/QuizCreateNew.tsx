import { Button, Grow, IconButton, Paper, Stack } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { IQuestion, IQuizColumn, QuestionType } from "../dataTypes/quizData";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import QuizColumnNew from "./QuizColumnNew";
import './QuizCreateNew.css'

interface QuizCreateNewProps{
    createNewQuiz: boolean;
    closeWindow: () => void;
    currentQuizColumns: IQuizColumn[];
    saveNewQuiz: (newQuiz: IQuizColumn[]) => void;
}

function QuizCreateNew (props: QuizCreateNewProps) {

    /**
     * The id for the first question in each row is the last one plus 100. Each now row get just added one to the id of the last row from that colum
     */
    const [newQuiz,setNewQuiz] = useState<IQuizColumn[]>([{columName: '',questions: [{id: 0,questionType: QuestionType.text , questionText: null, questionImage: null, questionTextFlow: null ,answer: '',finished: false,points: 100}]}]);

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(newQuiz)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json"
        link.click();
    };

    /**
     * The following two functions and the ref handle the upload
     */
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        if(hiddenFileInput.current != null){
            hiddenFileInput.current.click();
        }
    };

    //This function is called on the import button
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e !== null && e.target !== null && e.target.files !== null){
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = e => {
                if(e.target && e.target.result){
                    const fileString: string = e.target.result as string
                    const fileData: IQuizColumn[] = JSON.parse(fileString)
                    setNewQuiz(fileData)
                }                
            };
        }
    };

    const addNewColumn = () =>{
        const numberOfQuestions = newQuiz[0].questions.length
        const questions: IQuestion[] = []
        const newBaseId = newQuiz[newQuiz.length - 1].questions[0].id + 100
        for(let i=0; i<numberOfQuestions; i++){
            questions.push({id: newBaseId + i,questionType: QuestionType.text , questionText: null, questionImage: null, questionTextFlow: null , answer: '',finished: false,points: newQuiz[0].questions[i].points})
        }
        const newColumn: IQuizColumn = {columName: '', questions: questions}
        setNewQuiz(prevState => {
            const tmpPrevState = [...prevState]
            tmpPrevState.push(newColumn)
            return tmpPrevState
        })
    }

    const removeLastColumn = () =>{
        if(newQuiz.length > 1){
            setNewQuiz(prevState => {
                const tmpPrevState = [...prevState]
                tmpPrevState.pop()
                return tmpPrevState
            })
        }
    }

    const changePoints = (questionRow: number, increase: boolean) =>{
        setNewQuiz(prevState => {
            const tmpPrevState = [...prevState]
            tmpPrevState.forEach((questionColumn: IQuizColumn) => {
                questionColumn.questions.forEach((question: IQuestion,index) =>{
                    if(index === questionRow){
                        if(increase){
                            question.points += 100;
                        }else if(question.points > 100){
                            question.points -= 100;
                        }
                    }
                })  
            })
            return tmpPrevState
        })
    }

    const addNewRow = () => {
        const numberOfQuestions = newQuiz[0].questions.length - 1
        const pointsLastRow = newQuiz[0].questions[numberOfQuestions].points
        setNewQuiz(prevState => {
            const tmpPrevState = [...prevState]
            tmpPrevState.forEach((questionColumn: IQuizColumn,index) => {
                const highestColumnId = questionColumn.questions[numberOfQuestions].id
                questionColumn.questions.push({id: highestColumnId + 1,questionType: QuestionType.text , questionText: null, questionImage: null, questionTextFlow: null ,answer: '',finished: false,points: pointsLastRow + 100})
            })
            return tmpPrevState
        })
    }

    const removeLastRow = () =>{
        if(newQuiz[0].questions.length > 1){
            setNewQuiz(prevState => {
                const tmpPrevState = [...prevState]
                tmpPrevState.forEach((questionColumn: IQuizColumn) => {
                    questionColumn.questions.pop()
                })
                return tmpPrevState
            })
        }
    }

    const changeQuestion = (columnIndex: number, questionIndex: number, newAnswer: string, changeAnswer: boolean, newQuestionType: QuestionType | null , newQuestionTextFlow?: string[], newQuestionImage?: string ,newQuestionText?: string) =>{
        setNewQuiz(prevState => {
            const tmpPrevState = [...prevState]
            if(tmpPrevState[columnIndex].questions[questionIndex]){
                if(newQuestionType !== null){
                    tmpPrevState[columnIndex].questions[questionIndex].questionType = newQuestionType
                }
                if(changeAnswer){
                    tmpPrevState[columnIndex].questions[questionIndex].answer = newAnswer 
                }else{
                    //Question needs to be added/changed
                    if(newQuestionText){
                        tmpPrevState[columnIndex].questions[questionIndex].questionText = newQuestionText 
                    }else if(newQuestionImage){
                        tmpPrevState[columnIndex].questions[questionIndex].questionImage = newQuestionImage 
                    }else if(newQuestionTextFlow){
                        tmpPrevState[columnIndex].questions[questionIndex].questionTextFlow = newQuestionTextFlow
                    }
                }
            }
            return tmpPrevState
        })
    }

    const loadCurrentQuiz = () =>{
        setNewQuiz([...props.currentQuizColumns])
    }

    const changeCategory = (columnIndex: number, newCategory: string) =>{
        setNewQuiz(prevState => {
            const tmpPrevState = [...prevState]
            if(tmpPrevState[columnIndex]){
                tmpPrevState[columnIndex].columName = newCategory 
            }
            return tmpPrevState
        })
    }



    return(
        <Grow in={props.createNewQuiz}>
            <div style={{position: 'absolute', top: '60px', height: 'calc(100% - 80px)', width: 'calc(100% - 30px)', left: '15px', zIndex: 2}}>
                <Paper style={{height: '100%', width: '100%'}} elevation={8}>
                    <Stack style={{height: '100%'}} gap={'5px'} justifyContent={'space-around'}>
                        <div style={{height: '3%'}}>Create new Quiz</div>
                        <Stack style={{height: '91%', width: '97%'}} alignSelf={'center'}>
                            <Stack flexDirection={'row'} className={'newQuizBoard'} gap={'10px'}>
                                {newQuiz.map((quizColumn, index) => (
                                    <QuizColumnNew key={index} 
                                            changeCategory={(newCategory: string) => {changeCategory(index,newCategory)}}
                                            changeQuestion={(questionIndex: number, newAnswer: string, changeAnswer: boolean, newQuestionType: QuestionType | null , newQuestionTextFlow?: string[], newQuestionImage?: string ,newQuestionText?: string) =>
                                                             {changeQuestion(index,questionIndex,newAnswer,changeAnswer,newQuestionType, newQuestionTextFlow, newQuestionImage,newQuestionText)}}
                                            lastColumn={index === newQuiz.length - 1} quizColumn={quizColumn} 
                                            changePoints={changePoints}/>
                                ))}
                            </Stack>
                        </Stack>
                        <Stack flexDirection={'row'} justifyContent={'center'} marginBottom={'5px'} gap={'5px'} height={'4%'}>
                            <Stack flexDirection={'row'} gap={'5px'} alignItems={'center'}>
                                <Stack flexDirection={'row'} gap={'5px'} alignItems={'center'}>
                                    Columns
                                    <IconButton aria-label="add" onClick={removeLastColumn}>
                                        <RemoveIcon/>
                                    </IconButton>
                                    <IconButton aria-label="add" onClick={addNewColumn}>
                                        <AddIcon/>
                                    </IconButton>
                                </Stack>
                                <Stack flexDirection={'row'} gap={'5px'} alignItems={'center'}>
                                    Rows
                                    <IconButton aria-label="add" onClick={removeLastRow}>
                                        <RemoveIcon/>
                                    </IconButton>
                                    <IconButton aria-label="add" onClick={addNewRow}>
                                        <AddIcon/>
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <Button variant='contained' onClick={() => {props.saveNewQuiz(newQuiz)}}>Save</Button>
                            <Button variant='contained' onClick={exportData}>Export</Button>
                            <Button variant='contained' onClick={handleUploadClick}>Import</Button>
                            <input 
                                type="file" onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{display: 'none'}}/>
                            <Button variant='contained' onClick={loadCurrentQuiz}>Load Current Quiz</Button>
                            <Button variant='contained' onClick={props.closeWindow}>Close</Button>
                        </Stack>
                        
                    </Stack>
                </Paper>
            </div>
        </Grow>
    )

}

export default QuizCreateNew;