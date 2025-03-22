import { ChakraProvider, Box, VStack, Heading, Text, Button, Container, Spinner, Badge, Progress, HStack, Icon, useToast, Stack, Link } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getRandomWord, resetUsedWords } from './services/jishoApi'
import { FaCheck, FaTimes, FaLinkedin, FaGithub, FaPlay } from 'react-icons/fa'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isStartScreen, setIsStartScreen] = useState(true)
  const toast = useToast()

  const loadNewQuestion = async () => {
    try {
      const question = await getRandomWord(questionNumber)
      if (question) {
        setCurrentQuestion(question)
        setShowExplanation(false)
        setSelectedAnswer(null)
      } else {
        toast({
          title: 'Error',
          description: 'No se pudo cargar la pregunta. Por favor, intenta de nuevo.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error loading question:', error)
      toast({
        title: 'Error',
        description: 'Ocurrió un error al cargar la pregunta.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    loadNewQuestion()
  }, [questionNumber])

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1)
      toast({
        title: '¡Correcto!',
        description: currentQuestion.explanation,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Incorrecto',
        description: currentQuestion.explanation,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleNextQuestion = () => {
    if (questionNumber < 20) {
      setQuestionNumber(questionNumber + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setScore(0)
    setQuestionNumber(1)
    setShowExplanation(false)
    setSelectedAnswer(null)
    setIsFinished(false)
    resetUsedWords()
    loadNewQuestion()
  }

  const handleStart = () => {
    setIsStartScreen(false)
    loadNewQuestion()
  }

  const getButtonColorScheme = (option) => {
    if (!showExplanation) return 'blue'
    if (option === currentQuestion.correctAnswer) return 'green'
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) return 'red'
    return 'gray'
  }

  const getButtonIcon = (option) => {
    if (!showExplanation) return null
    if (option === currentQuestion.correctAnswer) return <Icon as={FaCheck} />
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) return <Icon as={FaTimes} />
    return null
  }

  if (isStartScreen) {
    return (
      <ChakraProvider>
        <Container maxW="container.md" py={{ base: 4, md: 5 }}>
          <VStack spacing={{ base: 6, md: 8 }} align="center" justify="center" minH="80vh">
            <Heading 
              size={{ base: "xl", md: "2xl" }} 
              textAlign="center" 
              color="blue.500"
              px={{ base: 4, md: 0 }}
            >
              Estudiando Japonés N5
            </Heading>
            
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              textAlign="center" 
              color="gray.600"
              px={{ base: 4, md: 0 }}
            >
              Pon a prueba tus conocimientos de vocabulario japonés con este quiz interactivo
            </Text>

            <Box 
              p={{ base: 4, md: 6 }} 
              borderWidth="1px" 
              borderRadius="lg" 
              w="100%" 
              maxW="600px"
              mx={{ base: 4, md: 0 }}
            >
              <VStack spacing={4} align="stretch">
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">Características:</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>• 20 preguntas de vocabulario</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>• Sistema de puntuación en tiempo real</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>• Retroalimentación inmediata</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>• Explicaciones detalladas</Text>
                <Text fontSize={{ base: "sm", md: "md" }}>• Interfaz adaptativa para móviles</Text>
              </VStack>
            </Box>

            <Button
              leftIcon={<FaPlay />}
              colorScheme="blue"
              size={{ base: "md", md: "lg" }}
              w={{ base: "180px", md: "200px" }}
              onClick={handleStart}
            >
              Comenzar Quiz
            </Button>

            <Box as="footer" mt={{ base: 6, md: 8 }} textAlign="center">
              <Text mb={2} fontSize={{ base: "sm", md: "md" }}>Desarrollado por @Miguel Reyna</Text>
              <HStack spacing={4} justify="center">
                <Link href="https://www.linkedin.com/in/miguel-reyna-ca%C3%B1adillas/" isExternal>
                  <Icon as={FaLinkedin} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="blue.500" />
                </Link>
                <Link href="https://github.com/g1okz" isExternal>
                  <Icon as={FaGithub} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="gray.700" />
                </Link>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </ChakraProvider>
    )
  }

  if (isFinished || !currentQuestion) {
    return (
      <ChakraProvider>
        <Container maxW="container.md" py={{ base: 4, md: 5 }}>
          <VStack spacing={4}>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              textAlign="center"
              px={{ base: 4, md: 0 }}
            >
              ¡Prueba completada! Tu puntuación: {score}/20
            </Text>
            <Button 
              colorScheme="blue" 
              size={{ base: "md", md: "lg" }} 
              w="100%" 
              maxW="300px"
              onClick={handleRestart}
            >
              Reiniciar Prueba
            </Button>
          </VStack>
        </Container>
      </ChakraProvider>
    )
  }

  const progress = (questionNumber / 20) * 100

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={{ base: 4, md: 5 }}>
        <VStack spacing={{ base: 3, md: 4 }}>
          <Heading 
            size={{ base: "md", md: "lg" }} 
            textAlign="center"
            px={{ base: 4, md: 0 }}
          >
            Estudia Japonés
          </Heading>
          
          <Stack 
            direction={{ base: 'column', md: 'row' }} 
            w="100%" 
            justify="space-between" 
            spacing={2}
            px={{ base: 4, md: 0 }}
          >
            <Text fontSize={{ base: "md", md: "lg" }}>Pregunta {questionNumber} de 20</Text>
            <Text fontSize={{ base: "md", md: "lg" }}>Puntuación: {score}</Text>
          </Stack>
          
          <Progress 
            value={progress} 
            w="100%" 
            colorScheme="blue"
            mx={{ base: 4, md: 0 }}
          />
          
          <Box 
            p={{ base: 3, md: 4 }} 
            borderWidth="1px" 
            borderRadius="lg" 
            w="100%" 
            boxShadow="md"
            mx={{ base: 4, md: 0 }}
          >
            <VStack spacing={{ base: 3, md: 4 }} align="stretch">
              <HStack justify="space-between" wrap="wrap" gap={2}>
                <Badge colorScheme="purple" fontSize={{ base: "xs", md: "sm" }}>
                  {currentQuestion.type}
                </Badge>
                <Badge colorScheme="orange" fontSize={{ base: "xs", md: "sm" }}>
                  {currentQuestion.level}
                </Badge>
              </HStack>
              
              <Text 
                fontSize={{ base: "xl", md: "4xl" }} 
                textAlign="center" 
                fontWeight="bold"
                px={{ base: 2, md: 0 }}
              >
                {currentQuestion.question}
              </Text>
              
              <VStack spacing={{ base: 2, md: 3 }} mt={2}>
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    colorScheme={getButtonColorScheme(option)}
                    w="100%"
                    h={{ base: "auto", md: "60px" }}
                    py={{ base: 3, md: 0 }}
                    fontSize={{ base: "sm", md: "lg" }}
                    onClick={() => !showExplanation && handleAnswer(option)}
                    isDisabled={showExplanation}
                    leftIcon={getButtonIcon(option)}
                    transition="all 0.2s"
                    _hover={!showExplanation ? { transform: 'scale(1.02)' } : {}}
                    whiteSpace="normal"
                    textAlign="center"
                    px={{ base: 2, md: 4 }}
                  >
                    {option}
                  </Button>
                ))}
              </VStack>

              {showExplanation && (
                <Box 
                  mt={4} 
                  p={{ base: 2, md: 3 }} 
                  bg="gray.50" 
                  borderRadius="md" 
                  borderWidth="1px"
                >
                  <Text 
                    fontWeight="bold" 
                    mb={2} 
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Explicación:
                  </Text>
                  <Text 
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    {currentQuestion.explanation}
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>

          {showExplanation && (
            <Button 
              colorScheme="blue" 
              size={{ base: "md", md: "lg" }} 
              w="100%" 
              maxW="300px"
              onClick={handleNextQuestion}
              mx={{ base: 4, md: 0 }}
            >
              {questionNumber < 20 ? 'Siguiente Pregunta' : 'Finalizar Prueba'}
            </Button>
          )}

          <Box 
            as="footer" 
            mt={{ base: 6, md: 8 }} 
            textAlign="center"
            px={{ base: 4, md: 0 }}
          >
            <Text 
              mb={2} 
              fontSize={{ base: "sm", md: "md" }}
            >
              Desarrollado por @Miguel Reyna
            </Text>
            <HStack spacing={4} justify="center">
              <Link href="https://www.linkedin.com/in/miguel-reyna-ca%C3%B1adillas/" isExternal>
                <Icon as={FaLinkedin} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="blue.500" />
              </Link>
              <Link href="https://github.com/g1okz" isExternal>
                <Icon as={FaGithub} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="gray.700" />
              </Link>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
