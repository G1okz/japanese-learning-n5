import { Box, Text, HStack, Link, Icon, useColorMode } from '@chakra-ui/react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

export const Footer = () => {
  const { colorMode } = useColorMode()

  return (
    <Box as="footer" mt={{ base: 6, md: 8 }} textAlign="center">
      <Text mb={2} fontSize={{ base: "sm", md: "md" }}>
        Desarrollado por @Miguel Reyna
      </Text>
      <HStack spacing={4} justify="center">
        <Link href="https://www.linkedin.com/in/miguel-reyna-ca%C3%B1adillas/" isExternal>
          <Icon as={FaLinkedin} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="blue.500" />
        </Link>
        <Link href="https://github.com/g1okz" isExternal>
          <Icon 
            as={FaGithub} 
            w={{ base: 5, md: 6 }} 
            h={{ base: 5, md: 6 }} 
            color={colorMode === 'dark' ? 'white' : 'gray.700'} 
          />
        </Link>
      </HStack>
    </Box>
  )
} 
