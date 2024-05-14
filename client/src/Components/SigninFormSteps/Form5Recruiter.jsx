import { FormControl, FormLabel, Heading, Input, Select } from "@chakra-ui/react";

export default function Form5(props) {
  const cities = props.cities;

  return (
    <>
      <Heading
        textAlign={"center"}
        fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
        mb='5%'>
        Company information
      </Heading>

      <div className='parent'>
        <FormControl mt='3%' isRequired>
          <FormLabel htmlFor='Company Name'>Business Name</FormLabel>
          <Input
            id='companyName'
            type='text'
            value={props.data.companyName}
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
            Based out of
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
            focusBorderColor='#af99ff'
          />
        </FormControl>
      </div>
    </>
  );
}
