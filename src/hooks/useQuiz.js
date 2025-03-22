import { useState, useEffect } from 'react'
import { getRandomWord, resetUsedWords } from '../services/jishoApi'
import { FaCheck, FaTimes } from 'react-icons/fa'

export const useQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const loadQuestion = () => {
    const question = getRandomWord()
    if (question) {
      setCurrentQuestion(question)
    }
  }

  useEffect(() => {
    resetUsedWords()
    loadQuestion()
  }, [])

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (questionNumber < 20) {
      setQuestionNumber(questionNumber + 1)
      loadQuestion()
      setShowExplanation(false)
      setSelectedAnswer(null)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    resetUsedWords()
    loadQuestion()
    setQuestionNumber(1)
    setScore(0)
    setShowExplanation(false)
    setIsFinished(false)
    setSelectedAnswer(null)
  }

  const getButtonColorScheme = (option) => {
    if (!showExplanation) return 'gray'
    if (option === currentQuestion.correctAnswer) return 'green'
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) return 'red'
    return 'gray'
  }

  const getButtonIcon = (option) => {
    if (!showExplanation) return null
    if (option === currentQuestion.correctAnswer) return 'check'
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) return 'times'
    return null
  }

  return {
    currentQuestion,
    questionNumber,
    score,
    showExplanation,
    isFinished,
    handleAnswer,
    handleNextQuestion,
    handleRestart,
    getButtonColorScheme,
    getButtonIcon,
    setIsFinished
  }
} 
