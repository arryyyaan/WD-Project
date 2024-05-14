import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FilePondComponent } from "../FilePondComponent";

export default function Form5Employee(props) {
  //     Resume { pdf }

  //     Skills
  //     Description
  // Highest level of Education
  //     Field
  //     City.
  //         Pincode.
  var cities = props.cities;
  return (
    <>
      <Heading
        textAlign={"center"}
        fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
        mb='5%'>
        Personal details
      </Heading>

      <div className='parent'>
        <FormControl mt='3%'>
          <FormLabel htmlFor='skills'>Enter your skills</FormLabel>
          <Input
            id='skills'
            type='text'
            placeholder='NodeJS , ReactJs'
            value={props.data.skills}
            onChange={props.setFormData}
            focusBorderColor='#af99ff'
          />
        </FormControl>
      </div>

      <div className='parent'>
        <FormControl mt='3%' isRequired>
          <FormLabel
            htmlFor='basedOutOfLocation'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}>
            City
          </FormLabel>

          <Select
            id='city'
            variant={"filled"}
            name='basedOutOfLocation'
            autoComplete='city'
            shadow='sm'
            size='md'
            w='full'
            onChange={props.setFormData}
            value={props.data.city}
            rounded='md'
            focusBorderColor='#af99ff'>
            <option key={-1} value='' disabled style={{ fontWeight: "bold.600" }}>
              Select the city
            </option>

            {cities.map((country, index) => {
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
        <FormControl mt='5%' isRequired>
          <FormLabel
            htmlFor='pincode'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}>
            Pincode
          </FormLabel>
          <Input
            type='number'
            id='pincode'
            value={props.data.pincode}
            onChange={props.setFormData}
          />
        </FormControl>
      </div>

      <Stack>
        <Text> Add resume</Text>
        <FilePondComponent
          profilePic={props.profilePic}
          deleteLogic={props.deleteLogic}
          acceptedFileType={["application/pdf"]}
          setLogic={props.setLogic}
          allowMultiple={false}
        />
      </Stack>
    </>
  );
}
