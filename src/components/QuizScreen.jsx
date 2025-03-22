import { VStack, Heading, Text, Progress, HStack, Button } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'
import { Footer } from './Footer'
import { QuestionCard } from './QuestionCard'

export const QuizScreen = ({
  currentQuestion,
  questionNumber,
  score,
  showExplanation,
  handleAnswer,
  handleNextQuestion,
  getButtonColorScheme,
  getButtonIcon,
  setIsFinished,
  onRestart
}) => {
  const progress = (questionNumber / 20) * 100

  return (
    <VStack spacing={{ base: 3, md: 4 }} position="relative">
      <ThemeToggle />
      <Heading 
        size={{ base: "sm", md: "lg" }} 
        textAlign="center"
        px={{ base: 4, md: 0 }}
        mt={{ base: 8, md: 0 }}
      >
        Estudia Japonés
      </Heading>
      
      <HStack 
        w="100%" 
        justify="space-between" 
        spacing={4}
        px={{ base: 4, md: 0 }}
        mt={{ base: 2, md: 0 }}
      >
        <Text fontSize={{ base: "sm", md: "lg" }}>Pregunta {questionNumber} de 20</Text>
        <Text fontSize={{ base: "sm", md: "lg" }}>Puntuación: {score}</Text>
      </HStack>
      
      <Progress 
        value={progress} 
        w="100%" 
        colorScheme="blue"
        mx={{ base: 4, md: 0 }}
      />
      
      <QuestionCard
        question={currentQuestion}
        options={currentQuestion.options}
        showExplanation={showExplanation}
        onAnswer={handleAnswer}
        getButtonColorScheme={getButtonColorScheme}
        getButtonIcon={getButtonIcon}
      />

      <VStack spacing={2} w="100%" maxW="300px" mx={{ base: 4, md: 0 }}>
        {showExplanation && (
          <Button 
            colorScheme="blue" 
            size={{ base: "md", md: "lg" }} 
            w="100%"
            onClick={handleNextQuestion}
          >
            {questionNumber < 20 ? 'Siguiente Pregunta' : 'Finalizar Prueba'}
          </Button>
        )}
        <Button 
          colorScheme="red" 
          size={{ base: "md", md: "lg" }} 
          w="100%"
          onClick={onRestart}
          variant="outline"
        >
          Volver al Inicio
        </Button>
      </VStack>

      <Footer />
    </VStack>
  )
} 
