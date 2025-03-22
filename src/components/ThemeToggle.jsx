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
      size="lg"
      position="absolute"
      top={4}
      right={4}
    />
  )
} 
