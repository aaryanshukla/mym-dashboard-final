
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/usa.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy, MdCheckCircle, MdAccountBalance, MdDataExploration } from 'react-icons/md';
import CheckTable from 'views/admin/rtl/components/CheckTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
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
	actualcompletedTickets: number;
	mopTicketsDone: number;
	recentCompletedTickets: string[];
	recentInProgressTickets: string[];
	last7DaysCompleted: number;
  }
  

  export default function UserReports() {
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
	  const brandColor = useColorModeValue('brand.500', 'white');
	  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	
	  // Show loading message while fetching data
	  if (loading) {
		return <div>Loading...</div>;
	  }
	
	  // Show error message if an error occurred
	  if (error) {
		return <div>Error: {error.message}</div>;
	  }
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />}
						/>
					}
					name='Number of Tickets'
					value={userData?.numTickets ? userData.numTickets : 'N/A'}
					/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdCheckCircle} color={brandColor} />}
						/>
					}
					name='Completed Tickets'
					value= {userData.completedTicketsOverallCount}
				/>
				<MiniStatistics name='Completed Last 7 Days' value= {userData.numTicketsCompleted} />
				<MiniStatistics
					 startContent={
						<IconBox
						  w='56px'
						  h='56px'
						  bg={boxBg}
						  icon={<Icon w='32px' h='32px' as={MdCheckCircle} color={brandColor} />}
						/>
					  }
					
					name='Frontend Tickets'
					value={userData.frontendPercentage + '%'} 
				/>
				<MiniStatistics
					 startContent={
						<IconBox
						  w='56px'
						  h='56px'
						  bg={boxBg}
						  icon={<Icon w='32px' h='32px' as={MdDataExploration} color={brandColor} />}
						/>
					  }
					name='Backend Tickets'
					value={userData.backendPercentage + '%'}
				/>
				<MiniStatistics
				 startContent={
					<IconBox
					  w='56px'
					  h='56px'
					  bg={boxBg}
					  icon={<Icon w='32px' h='32px' as={MdDataExploration} color={brandColor} />}
					/>
				  }
					name='Fullstack Tickets'
					value= {userData.fullstackPercentage + '%'}
				/>
			</SimpleGrid>

			<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
				<TotalSpent />

				<WeeklyRevenue />

			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<CheckTable tableData={tableDataCheck} />
				<SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap='20px'>
				<MiniCalendar h='50%' minW='100%' selectRange={false} />

				</SimpleGrid>
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
				</SimpleGrid>
			</SimpleGrid>
		</Box>
	);
}
