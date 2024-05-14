import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Image,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SplitLoginPage() {
  const toast = useToast();
  localStorage.setItem("executed", false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const setFormData = e => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  console.log(data);

  const dealingWithLoginPageSubmission = async e => {
    e.preventDefault();
    const response = await fetch("https://jobseeker-f7rl.onrender.com/user/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      console.log(await response.json());
      localStorage.setItem("userInfo", JSON.stringify())
      toast({
        title: "Login Successful!",
        status: "success",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
      navigate("/dashboard");
    } else if (data.email === "" || data.password === "") {
      toast({
        title: "Field(s) cannot be empty!",
        status: "error",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
    } else {
      //show that wrong credentials
      toast({
        title: "Invalid Credentials",
        status: "error",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
    }
  };

  return (
    <Grid templateColumns='2fr 1fr 1fr' height='89.5vh' overflow='hidden'>
      <GridItem gridColumn='1 / -2' gridRow={1}>
        <Image
          alt='Cover image'
          objectFit='cover'
          height='100%'
          width='100%'
          src='https://wallpaperaccess.com/full/2484157.jpg'
        />
      </GridItem>

      <GridItem
        gridColumn='-3 / -1'
        gridRow={1}
        placeSelf='center'
        position='relative'
        rounded='lg'
        boxShadow='2xl'
        isolation='isolate'
        overflow='hidden'>
        <Box
          bg={useColorModeValue("white", "gray.700")}
          opacity={0.95}
          position='absolute'
          inset='0'
          zIndex={-1}></Box>
        <Grid
          gridAutoRows='auto'
          gap='1.5rem'
          as='form'
          noValidate
          onSubmit={dealingWithLoginPageSubmission}
          p={{ base: 3, sm: "2em" }}>
          <GridItem>
            <Box textAlign='center'>
              <Heading fontSize={"3xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={useColorModeValue("black", "gray.300")}>
                to enjoy all of our cool{" "}
                <Link href='about' color={"#af99ff"}>
                  features
                </Link>
              </Text>
            </Box>
          </GridItem>

          <GridItem display='grid' gap='1rem'>
            <FormControl id='email' isRequired className='form-input'>
              <FormLabel>Email/Username</FormLabel>
              <Input
                rounded='md'
                onChange={setFormData}
                type='email'
                value={data.username}
                focusBorderColor='#af99ff'
              />
            </FormControl>

            <FormControl id='password' isRequired className='form-input'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={setFormData}
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  focusBorderColor='#af99ff'
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword(showPassword => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </GridItem>

          <GridItem
            display='grid'
            gridTemplateColumns='repeat(2,1fr)'
            placeItems='center'
            gap='1rem 0'>
            <Checkbox colorScheme='green' size='md'>
              Remember me
            </Checkbox>
            <Link
              as={NavLink}
              to='/forgotpassword'
              state={{ email: data.email, from: 1 }}
              fontSize={{ base: "md", sm: "md" }}>
              Forgot password?
            </Link>
            <Button
              bg='green.400'
              color='white'
              _hover={{
                bg: "green.600",
              }}
              rounded='md'
              type='submit'
              width='100%'
              gridColumn='span 2'>
              Sign in
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
