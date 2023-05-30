import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios'; // Import Axios library
import React, { useEffect, useState } from 'react'; // Import useEffect and useState from React
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy, MdCheckCircle, MdAccountBalance } from 'react-icons/md';
import CheckTable from 'views/admin/rtl/components/CheckTable';
import Tasks from 'views/admin/rtl/components/Tasks';
import TotalSpent from 'views/admin/rtl/components/TotalSpent';
import WeeklyRevenue from 'views/admin/rtl/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/rtl/variables/tableDataCheck';
import tableDataComplex from 'views/admin/rtl/variables/tableDataComplex';
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
  
export default function UserReports() {
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
          name='Completed Tickets'
		  value= {userData.numTickets}

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
          value='$642.39'
        />
        <MiniStatistics  name='Completed Last 7 Days' value='$574.34' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
              </FormLabel>
              <Select id='balance' variant='mini' mt='5px' me='0px' defaultValue='usd'>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gba'>GBA</option>
              </Select>
            </Flex>
          }
          name='Your balance'
          value='$1,000'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='New Tasks'
          value='154'
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
          name='FullStack Tickets'
          value='2935'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
