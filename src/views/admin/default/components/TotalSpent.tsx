// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
import { pieChartData, pieChartOptions } from 'variables/charts';
import { VSeparator } from 'components/separator/Separator';
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
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
  
export default function Conversion(props: { [x: string]: any }) {
	const { ...rest } = props;
	const [userData, setUserData] = useState<userData | null>(null);  const [loading, setLoading] = useState(true); // State to track loading state
	const [error, setError] = useState(null); // State to handle errors
  
	useEffect(() => {
	  // Fetch user data from the backend
	  axios
		.get('localhost:3001/api/tickets') // Replace '/api/user' with the actual endpoint to fetch user data
		.then(response => {
		  setUserData(response.data); // Update the state with the fetched user data
		  setLoading(false); // Set loading state to false
		})
		.catch(error => {
		  setError(error); // Set error state if an error occurs
		  setLoading(false); // Set loading state to false
		});
	}, []);
	
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	 // Show loading message while fetching data
	 if (loading) {
		return <div>Loading...</div>;
	  }
	
	  // Show error message if an error occurred
	  if (error) {
		return <div>Error: {error.message}</div>;
	  }
	  console.log("Test#3")

	
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex
				px={{ base: '0px', '2xl': '10px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'>
				<Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
					Difficulty of Tickets
				</Text>
				
			</Flex>

			<PieChart h='100%' w='100%' chartData={pieChartData} chartOptions={pieChartOptions} />
			<Card
				bg={cardColor}
				flexDirection='row'
				boxShadow={cardShadow}
				w='100%'
				p='15px'
				px='20px'
				mt='15px'
				mx='auto'>
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							SP: 2
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{userData.numTicketsSp2}
					</Text>
				</Flex>
				<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							SP: 3
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{userData.numTicketsSp3}
					</Text>
				</Flex>
				<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							SP:4
						</Text>
					</Flex>
					<Text fontSize='lg' color={textColor} fontWeight='700'>
						{userData.numTicketsSp4}
					</Text>
				</Flex>

			</Card>
		</Card>
	);
}
