import { VStack, Text, Button } from '@chakra-ui/react'
import { ThemeToggle } from './ThemeToggle'

export const ResultScreen = ({ score, onRestart }) => {
  return (
    <VStack spacing={4}>
      <ThemeToggle />
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
        onClick={onRestart}
      >
        Reiniciar Prueba
      </Button>
    </VStack>
  )
} 
