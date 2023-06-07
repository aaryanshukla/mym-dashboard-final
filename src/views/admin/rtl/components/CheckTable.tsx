import {
	Box,
	Flex,
	Icon,
	Progress,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue
  } from '@chakra-ui/react';
  import Card from 'components/card/Card';
  import Menu from 'components/menu/MainMenu';
  import React, { useEffect, useState } from "react";
  import axios, { AxiosResponse } from "axios";
  import { MdCheckCircle } from 'react-icons/md';
  
  interface userData {
	completedTicketsOverallCount: number;
	numTickets: number;
	getNameCompletedTicketsOverall: number;
	numTicketsCompleted: number;
	frontendPercentage: number;
	backendPercentage: number;
	fullstackPercentage: number;
	otherPercentage: number;
	numTicketsSp2: number;
	numTicketsSp3: number;
	numTicketsSp4: number;
	numTicketsSp5: number;
	recentCompletedTickets: string[];
	recentInProgressTickets: string[];
  }
  
  export default function ComplexTable(props: { tableData: any }) {
	const { tableData } = props;
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userData, setUserData] = useState<userData | null>(null);
  
	useEffect(() => {
	  // Fetch user data from the backend
	  console.log("I am in the frontend")
	  axios
		.get('localhost:3001/api/tickets') // Replace '/api/user' with the actual endpoint to fetch user data
		.then((response: AxiosResponse<userData>) => {
		  setUserData(response.data); // Update the state with the fetched user data
		  setLoading(false); // Set loading state to false
		  console.log("Failed")

		})
		.catch((error) => {
		  setError(error); 
		  setLoading(false); 
		});
	}, []);
  
	if (loading) {
	  return <div>Loading...</div>;
	}
  
	if (error) {
	  return <div>Error: {error.message}</div>;
	}
  
	return (
	  <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
		<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
		  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
			Recently Completed Tickets
		  </Text>
		  <Menu />
		</Flex>
		<Table variant='simple'>
		  <Thead>
			<Tr>
			  <Th>Ticket Name</Th>
			  <Th>Status</Th>
			  <Th>Progress</Th>
			</Tr>
		  </Thead>
		  <Tbody>
			{userData?.recentCompletedTickets.map((ticket: string, index: number) => (
			  <Tr key={index}>
				<Td>{ticket}</Td>
				<Td>
				  <Icon as={MdCheckCircle} color='green.500' />
				</Td>
				<Td>
				  <Progress value={100} size='sm' colorScheme='green' />
				</Td>
			  </Tr>
			))}
		  </Tbody>
		</Table>
	  </Card>
	);
  }
  