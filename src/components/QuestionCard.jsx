import { Box, VStack, HStack, Badge, Text, Button } from '@chakra-ui/react'
import { FaCheck, FaTimes } from 'react-icons/fa'

export const QuestionCard = ({ 
  question, 
  options, 
  showExplanation, 
  onAnswer, 
  getButtonColorScheme, 
  getButtonIcon 
}) => {
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'check':
        return <FaCheck />
      case 'times':
        return <FaTimes />
      default:
        return null
    }
  }

  return (
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
            {question.type}
          </Badge>
          <Badge colorScheme="orange" fontSize={{ base: "xs", md: "sm" }}>
            {question.level}
          </Badge>
        </HStack>
        
        <Text 
          fontSize={{ base: "xl", md: "4xl" }} 
          textAlign="center" 
          fontWeight="bold"
          px={{ base: 2, md: 0 }}
        >
          {question.question}
        </Text>
        
        <VStack spacing={{ base: 2, md: 3 }} mt={2}>
          {options.map((option, index) => (
            <Button
              key={index}
              colorScheme={getButtonColorScheme(option)}
              w="100%"
              h={{ base: "auto", md: "60px" }}
              py={{ base: 3, md: 0 }}
              fontSize={{ base: "sm", md: "lg" }}
              onClick={() => !showExplanation && onAnswer(option)}
              isDisabled={showExplanation}
              leftIcon={renderIcon(getButtonIcon(option))}
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
              {question.explanation}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
} 
