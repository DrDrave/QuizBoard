import { IQuizColumn, QuestionType } from "../dataTypes/quizData";

export const quizColumnsMockData: IQuizColumn[] =
    [{columName: 'Wissen',questions: [
                {questionType: QuestionType.text, question: 'Wie viel Blut enthält der Körper eines Erwachsenen ungefähr?',answer: '5 Liter',points: 100, id: 0,finished: false},
                {questionType: QuestionType.text, question: 'Welcher ist der einzige Planet, der die Sonne im Uhrzeigersinn umkreist?',answer: 'Venus',points: 300, id: 1,finished: false},
                {questionType: QuestionType.text, question: 'Wie viele Elementarteilchen hat das Standard-Modell?',answer: '17',points: 500, id: 2,finished: false}]},
    {columName: 'Sport' ,questions: [
                {questionType: QuestionType.text, question: 'Wer gewann 2020 die WM?',answer: 'Italien',points: 100, id: 3,finished: false},
                {questionType: QuestionType.text, question: 'Wie viele Spieler sind beim Feldhockey pro Team auf dem Platz?',answer: '11',points: 300, id: 4,finished: false},
                {questionType: QuestionType.text, question: 'Wie groß ist die zu fahrende Distanz mit dem Fahrrad beim Ironman?',answer: '180,246 km',points: 500, id: 5,finished: false}]},
    {columName: 'Geographie' ,questions: [
                {questionType: QuestionType.text, question: 'Wie Viele Länder grenzen an Deutschland?',answer: '9',points: 100, id: 6,finished: false},
                {questionType: QuestionType.text, question: 'Welche ist die größte Stadt in der EU?',answer: 'Paris',points: 300, id: 7,finished: false},
                {questionType: QuestionType.text, question: 'Wie heißt der zweit höchste Berg der Erde',answer: 'Mount Godwin Austen (K2)',points: 500, id: 8,finished: false}]}]
