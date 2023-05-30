// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue, Checkbox } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import IconBox from 'components/icons/IconBox';
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
// Assets
import { MdCheckBox, MdDragIndicator } from 'react-icons/md';
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
	const [userData, setUserData] = useState<userData | null>(null);  const [loading, setLoading] = useState(true); // State to track loading state
	const [error, setError] = useState(null); // State to handle errors
  
	useEffect(() => {
	  // Fetch user data from the backend
	  axios
		.get('/api/tickets') // Replace '/api/user' with the actual endpoint to fetch user data
		.then(response => {
		  setUserData(response.data); // Update the state with the fetched user data
		  setLoading(false); // Set loading state to false
		})
		.catch(error => {
		  setError(error); // Set error state if an error occurs
		  setLoading(false); // Set loading state to false
		});
	}, []);

	
  
	const { ...rest } = props;

	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	if (loading) {
		return <div>Loading...</div>;
	  }
	
	  // Show error message if an error occurred
	  if (error) {
		return <div>Error: {error.message}</div>;
	  }
	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex alignItems='center' w='100%' mb='30px'>
				<IconBox
					me='12px'
					w='38px'
					h='38px'
					bg={boxBg}
					icon={<Icon as={MdCheckBox} color={brandColor} w='24px' h='24px' />}
				/>

				<Text color={textColor} fontSize='lg' fontWeight='700'>
					Tasks
				</Text>
				<Menu ms='auto' />
			</Flex>
			<Box px='11px' w='100%'>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
						{userData.recentInProgressTickets[0]}
					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox me='16px' defaultChecked colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
					{userData.recentInProgressTickets[1]}

					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
					{userData.recentInProgressTickets[2]}
					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
					{userData.recentInProgressTickets[3]}
					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
					{userData.recentInProgressTickets[4]}
					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
					{userData.recentInProgressTickets[5]}
					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
				<Flex w='100%' justify='space-between' mb='20px'>
					<Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
					<Text fontWeight='bold' color={textColor} fontSize='md' textAlign='start'>
					{userData.recentInProgressTickets[6]}
					</Text>
					<Icon ms='auto' as={MdDragIndicator} color='secondaryGray.600' w='24px' h='24px' />
				</Flex>
			</Box>
		</Card>
	);
}
