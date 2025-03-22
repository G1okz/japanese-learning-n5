import { IconButton } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useColorMode } from '@chakra-ui/react'

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      aria-label="Cambiar tema"
      colorScheme="blue"
      variant="ghost"
      size={{ base: "md", md: "lg" }}
      position="absolute"
      top={{ base: 1, md: 0 }}
      right={{ base: 1, md: 4 }}
      zIndex={1}
    />
  )
} 
