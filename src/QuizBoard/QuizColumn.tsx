import { Paper, Stack } from '@mui/material'
import { IQuizColumn } from '../dataTypes/quizData'
import QuizCard from './QuizCard'
import './QuizColumn.css'

interface QuizColumnProps {
    quizColumn: IQuizColumn;
    setSelectedQuestionID: React.Dispatch<React.SetStateAction<number | null>>;
}

function QuizColumn (props: QuizColumnProps) {
    return (
        <Stack className={'QuizColumn'}
            direction={'column'} 
            flexGrow={1}
            gap={'15px'}
            justifyContent="space-around">

            <Paper style={{flexGrow: 1}} elevation={8} className={'QuizCardHeader'}>
                <Stack style={{height: '100%', justifyContent: 'center', background: 'lightgray'}}>
                    <h1 className={'QuizCardTopic'}>
                        {props.quizColumn.columName}
                    </h1>                                            
                </Stack>
            </Paper>
            {props.quizColumn.questions.map((question, index) => (
                <div key={index} style={{flexGrow: 1}} className={'QuizCardItem'}>
                    <QuizCard question={question} setSelectedQuestionID={props.setSelectedQuestionID}/>
                </div>
            ))}

        </Stack>
    )
}

export default QuizColumn
