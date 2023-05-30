import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
require('dotenv').config();



const app = express();
const port = 3001;


let completedTicketsCount = 0; // Variable to store the amount of completed tickets
let completedTicketsOverallCount = 0; // Variable to store the overall amount of completed tickets
let mopTicketsDone = 0; 

app.get('/api/tickets', async (req, res) => {
  
  try {
    // JIRA API details
    const jiraUrl = process.env.JIRA_URL || '';
    const apiUsername = process.env.API_USERNAME || '';
    const apiToken = process.env.API_TOKEN || '';
    const getTickets = async (jqlQuery: string) => {
      const apiEndpoint = `${jiraUrl}/rest/api/3/search?jql=${jqlQuery}`;
      const response = await axios.get(apiEndpoint, {
        auth: {
          username: apiUsername,
          password: apiToken,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        return null;
      }
    };

    const getCompletedTicketsOverall = async () => {
      const apiEndpoint = `${jiraUrl}/rest/api/3/search?jql=project = MOP AND status = Done`;
      const response = await axios.get(apiEndpoint, {
        auth: {
          username: apiUsername,
          password: apiToken,
        },
      });
      if (response.status === 200) {
        const completedTickets = response.data.issues;
        const ticketNames = completedTickets.map((ticket: any) => ticket.fields.summary);
        return {
          total: completedTickets.length,
          ticketNames,
        };
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        return null;
      }
    };
    const getLast7DaysCompleted = async () => {
      const apiEndpoint = `${jiraUrl}/rest/api/3/search?jql=project = MOP AND status = Done AND resolved >= -7d`;
      const response = await axios.get(apiEndpoint, {
        auth: {
          username: apiUsername,
          password: apiToken,
        },
      });
    
      if (response.status === 200) {
        const completedTickets = response.data.issues;
        const ticketNames = completedTickets.map((ticket) => ticket.fields.summary);
    
        return {
          total: completedTickets.length,
          ticketNames,
        };
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        return null;
      }
    };
    const last7DaysCompleted = await getLast7DaysCompleted();


    const getInProgressTickets = async () => {
      const apiEndpoint = `${jiraUrl}/rest/api/3/search?jql=project = MOP AND status = "In Progress"`;
      const response = await axios.get(apiEndpoint, {
        auth: {
          username: apiUsername,
          password: apiToken,
        },
      });
      if (response.status === 200) {
        const inProgressTickets = response.data.issues;
        const ticketNames = inProgressTickets.map((ticket: any) => ticket.fields.summary);
        return {
          total: inProgressTickets.length,
          ticketNames,
        };
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
        return null;
      }
    };

    // Retrieve all tickets
    const allTickets = await getTickets('project = MOP');

    if (!allTickets) {
      throw new Error('Failed to fetch ticket data');
    }

    const numTickets = allTickets.total;

    // Retrieve completed tickets in the last 7 days
    const completedTickets = await getTickets('project = MOP AND status = Done AND resolved >= -7d');
    const actualcompletedTickets = await getTickets('project = MOP and status = Done');

    if (!completedTickets) {
      throw new Error('Failed to fetch ticket data');
    }

    const completedTicketsOverall = await getCompletedTicketsOverall();

    if (!completedTicketsOverall) {
      throw new Error('Failed to fetch ticket data');
    }

    const inProgressTickets = await getInProgressTickets();

    if (!inProgressTickets) {
      throw new Error('Failed to fetch ticket data');
    }

    const numTicketsCompleted = completedTickets.total;
    const numTicketsCompletedOverall = completedTicketsOverall.total;

    // Update the completed tickets counts
    completedTicketsCount = numTicketsCompleted;
    completedTicketsOverallCount = numTicketsCompletedOverall;

    let frontendTickets = 0;
    let backendTickets = 0;
    let fullstackTickets = 0;
    let otherTickets = 0;

    allTickets.issues.forEach((issue: any) => {
      const labels = issue.fields.labels;
      if (labels.includes('frontend')) {
        frontendTickets += 1;
      } else if (labels.includes('backend')) {
        backendTickets += 1;
      } else if (labels.includes('fullstack')) {
        fullstackTickets += 1;
      } else {
        otherTickets += 1;
      }
    });

    const frontendPercentage = Math.floor((frontendTickets / numTickets) * 1000000);
    const backendPercentage = Math.floor((backendTickets / numTickets) * 100);
    const fullstackPercentage = Math.floor((fullstackTickets / numTickets) * 100);
    const otherPercentage = Math.floor((otherTickets / numTickets) * 100);

    // Retrieve tickets with different story point estimates
    const storyPoints2 = await getTickets('project = MOP AND "Story point estimate" = 2');
    const storyPoints3 = await getTickets('project = MOP AND "Story point estimate" = 3');
    const storyPoints4 = await getTickets('project = MOP AND "Story point estimate" = 4');
    const storyPoints5 = await getTickets('project = MOP AND "Story point estimate" = 5');

    const numTicketsSp2 = storyPoints2 ? storyPoints2.total : 0;
    const numTicketsSp3 = storyPoints3 ? storyPoints3.total : 0;
    const numTicketsSp4 = storyPoints4 ? storyPoints4.total : 0;
    const numTicketsSp5 = storyPoints5 ? storyPoints5.total : 0;

    // Retrieve MOP tickets with status Done
    const mopTicketsDoneResult = await getTickets('project = MOP AND status = Done');
    if (mopTicketsDoneResult) {
      mopTicketsDone = mopTicketsDoneResult.issues;
    }

    const ticketData = {
      last7DaysCompleted,
      numTickets,
      numTicketsCompleted,
      numTicketsCompletedOverall,
      frontendPercentage,
      backendPercentage,
      fullstackPercentage,
      otherPercentage,
      numTicketsSp2,
      numTicketsSp3,
      numTicketsSp4,
      numTicketsSp5,
      completedTicketsCount,
      completedTickets,
      completedTicketsOverallCount,
      actualcompletedTickets,
      recentCompletedTickets: completedTicketsOverall.ticketNames,
      recentInProgressTickets: inProgressTickets.ticketNames,
      mopTicketsDone,
    };

    res.json(ticketData);
  } catch (error) {
    console.error('Error:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch ticket data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
