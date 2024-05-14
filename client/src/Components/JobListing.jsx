import {
  Grid,
  Text,
  useColorModeValue,
  Stack,
  Badge,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const JobListing = ({ job, key }) => {
  const [auth] = useOutletContext();
  const { jobTitle, field, users, workLocation, recruiterId, skills, salary, _id } = job;

  const [Recruiter, setRecruiter] = useState({});
  const [NApps, setNApps] = useState(users.length);
  const [Applied, setApplied] = useState(users.map(x => x._id).includes(auth._id));

  const toast = useToast();

  const getRecruiter = async () => {
    let res = await fetch(`http://localhost:5000/recruiter/${recruiterId}`, {
      credentials: "include",
    });
    let data = await res.json();
    console.log(data);
    setRecruiter(data);
  };

  useEffect(() => {
    getRecruiter();
  }, []);

  const applyJob = async () => {
    let res = await fetch("http://localhost:5000/job/applyJob", {
      method: "POST",
      body: JSON.stringify({
        jobId: _id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    let applied = res.status == 200;
    if (applied) {
      setNApps(x => x + 1);
      setApplied(true);
      toast({
        status: "success",
        title: "Applied Successfully!",
        description: "Successfully applied to selected job.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid
      key={key}
      padding='1em'
      border='2px solid'
      borderColor='gray.500'
      borderRadius='lg'
      templateColumns='auto 1fr'
      backgroundColor={useColorModeValue("gray.50", "gray.800")}
      gap='0.5em 1em'>
      <Image
        src={
          Recruiter?.user?.profilePic || "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
        }
        width='2rem'
        height='2rem'
        borderRadius='50%'
        border='2px solid #eee'
      />

      <Text
        fontSize='lg'
        gridColumn='2'
        fontWeight='bold'
        lineHeight='2'
        borderBottom='2px solid'
        borderBottomColor='#af99ff'>
        {jobTitle}
      </Text>
      <Text fontSize='md' gridColumn='1 / -1'>
        {field}, ₹{salary}
      </Text>
      <Text fontSize='md' gridColumn='1 / -1'>
        {workLocation}
        {Recruiter?.rec?.basedOutOff ? `, ${Recruiter?.rec?.basedOutOff}` : ""}
      </Text>
      {NApps ? (
        <Text fontSize='sm' gridColumn='1 / -1'>
          {NApps} have already applied!
        </Text>
      ) : (
        ""
      )}
      <Stack direction='row' wrap='wrap' gap='0.25em 0' placeSelf='start' gridColumn='1 / -1'>
        {skills.split(",").map(x => (
          <Badge fontSize='sm' key={x} textTransform='capitalize' padding={"0 0.25em"}>
            {x}
          </Badge>
        ))}
      </Stack>

      {Applied ? (
        <Button
          variant='solid'
          backgroundColor='hsla(253, 100%, 80%, 0.5)'
          gridColumn='1 / -1'
          borderColor='#af99ff'
          _hover={""}
          _active={""}
          disabled>
          Applied!
        </Button>
      ) : (
        <Button
          variant='solid'
          backgroundColor='hsla(253, 100%, 80%, 0.5)'
          gridColumn='1 / -1'
          borderColor='#af99ff'
          _hover={{
            backgroundColor: "#af99ff",
          }}
          onClick={applyJob}>
          Apply
        </Button>
      )}
    </Grid>
  );
};

export default JobListing;
