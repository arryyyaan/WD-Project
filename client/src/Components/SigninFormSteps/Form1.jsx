import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  HStack,
  Select,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function Form1(props) {
  const countries = props.countries;

  useEffect(() => {
    props.setPhoneNumberPrefix(
      countries.find(country => country.name == props.data.country).phonecode.charAt(0) == "+"
        ? countries.find(country => country.name == props.data.country).phonecode
        : "+" + countries.find(country => country.name == props.data.country).phonecode
    );
  }, [props.data.country]);

  const dealingWithPhoneNumberPrefixOnCountryChange = e => {
    props.setFormData(e);
  };

  return (
    <>
      <Heading
        textAlign={"center"}
        fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
        mb='5%'>
        User Details
      </Heading>

      <HStack spacing={8}>
        <div className='parent'>
          <FormControl>
            <FormLabel htmlFor='firstName'>First name</FormLabel>
            <Input
              id='firstName'
              value={props.data.firstName}
              onChange={props.setFormData}
              focusBorderColor='#af99ff'
            />
          </FormControl>
        </div>

        <div className='parent'>
          <FormControl>
            <FormLabel htmlFor='lastName'>Last name</FormLabel>
            <Input
              id='lastName'
              value={props.data.lastName}
              onChange={props.setFormData}
              focusBorderColor='#af99ff'
            />
          </FormControl>
        </div>
      </HStack>

      <div className='parent'>
        <FormControl mt='3%' isRequired isInvalid={props.errors.email}>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input
            id='email'
            type='email'
            value={props.data.email}
            onChange={props.setFormData}
            focusBorderColor='#af99ff'
          />
          {props.errors.email == "" ? (
            <FormHelperText>We'll never share your email</FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.email}</FormErrorMessage>
          )}
        </FormControl>
      </div>

      <div className='parent'>
        <FormControl mt='3%' isRequired>
          <FormLabel
            htmlFor='country'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}>
            Country
          </FormLabel>

          <Select
            id='country'
            variant={"filled"}
            name='country'
            autoComplete='country'
            shadow='sm'
            size='md'
            w='full'
            onChange={dealingWithPhoneNumberPrefixOnCountryChange}
            value={props.data.country}
            focusBorderColor='#af99ff'
            rounded='md'>
            <option key={-1} value='' disabled style={{ fontWeight: "bold.600" }}>
              Select the country
            </option>
            {countries.map((country, index) => {
              return (
                <option value={country.name} key={index}>
                  {country.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className='parent'>
        <FormControl mt='5%' isRequired isInvalid={props.errors.phoneNumber}>
          <FormLabel
            htmlFor='country'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}>
            Phone Number
          </FormLabel>
          <InputGroup>
            <InputLeftAddon children={props.phoneNumberPrefix} />
            <Input
              type='number'
              id='phoneNumber'
              value={props.data.phoneNumber}
              onChange={props.setFormData}
              focusBorderColor='#af99ff'
            />
          </InputGroup>
          {props.errors.phoneNumber == "" ? (
            <FormHelperText>We wont spam your phone number</FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.phoneNumber}</FormErrorMessage>
          )}
        </FormControl>
      </div>
    </>
  );
}
