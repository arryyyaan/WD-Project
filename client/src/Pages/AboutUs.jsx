import { Container, Text, VStack, Box, Avatar, Icon, chakra, useColorModeValue, Grid, SimpleGrid, Flex } from '@chakra-ui/react';
import { FaQuoteRight } from 'react-icons/fa';

const testimonials = [{
  username: 'Ben Parker',
  position: 'CEO',
  company: 'Foodtesla',
  image:
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
      rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
      risus at semper`
}];

export default function AboutUs() {

  return (
    <>

      <Flex justify="center" mt={'140px'}  textAlign='center'>
        <Text fontSize={'xl'} lineHeight={'tall'}>
          This website was made by 4 engineering undergraduates with the vision of connecting workers with recruiters.
          The goal was to make it easier for employees to display their skills and at the same time for recruiters to hire.
          We have made a very unique and innovative UI that captivates the users and puts trust in our website.

        </Text>
      </Flex>

      <Flex justify="center"  >
        <chakra.h3 fontSize="3xl" fontWeight="bold" mb={3}>
          Testimonials
        </chakra.h3>
      </Flex>

      <SimpleGrid columns={2} minChildWidth="465px">
        {testimonials.map((testimonial, index) => {
          return (
            <Container maxW="5xl" p={{ base: 5, md: 10 }}>
              <VStack
                spacing={3}
                p={{ base: 4, sm: 8 }}
                bg='white'
                _dark={{ bg: "blackAlpha.600" }}
                borderTop="2px solid"
                borderColor="green.400"
                borderBottomLeftRadius="lg"
                borderBottomRightRadius="lg"
                maxW="25rem"
                margin="0 auto"
                boxShadow="lg"
                key={index}
              >
                <Icon as={FaQuoteRight} w={8} h={8} color="green.400" />
                <Text p={5} color="gray.500">
                  {testimonial.content}
                </Text>
                <VStack alignItems="center">
                  <Avatar name="avatar" src={testimonial.image} size="lg" />
                  <Box textAlign="center">
                    <Text fontWeight="bold" fontSize="lg">
                      {testimonial.username}
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      {testimonial.position} at {testimonial.company}
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </Container>

          )
        })}
      </SimpleGrid>
    </>
  );
}
