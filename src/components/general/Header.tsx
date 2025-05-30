import { Box, HStack } from '@chakra-ui/react'
import CartBadge from './CartBadge'


const Header = () => {
  return (
    <HStack
        flexShrink={0}
        bg={"palette.200"}
        h={"40px"}
        w={"100%"}
        paddingX={"16px"}
    >
        <Box flex={1}/>
        <CartBadge/>
    </HStack>
  )
}

export default Header