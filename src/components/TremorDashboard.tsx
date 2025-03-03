"use client";

import React from "react";
import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Metric,
  AreaChart,
  BarChart,
  DonutChart,
  Legend,
  Flex,
  Grid,
} from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    "Event Registrations": 2890,
    "Ticket Sales": 2338,
  },
  {
    date: "Feb 22",
    "Event Registrations": 2756,
    "Ticket Sales": 2103,
  },
  {
    date: "Mar 22",
    "Event Registrations": 3322,
    "Ticket Sales": 2194,
  },
  {
    date: "Apr 22",
    "Event Registrations": 3470,
    "Ticket Sales": 2108,
  },
  {
    date: "May 22",
    "Event Registrations": 3475,
    "Ticket Sales": 1812,
  },
  {
    date: "Jun 22",
    "Event Registrations": 3129,
    "Ticket Sales": 1726,
  },
];

const eventData = [
  {
    name: "Tech Conference",
    attendees: 1230,
  },
  {
    name: "AI Workshop",
    attendees: 751,
  },
  {
    name: "Startup Meetup",
    attendees: 471,
  },
  {
    name: "Hackathon",
    attendees: 280,
  },
  {
    name: "Networking Event",
    attendees: 78,
  },
];

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat("us").format(number).toString()}`;

const TremorDashboard = () => {
  return (
    <main className="p-12">
      <Title>Medellin AI Event Platform Dashboard</Title>
      <Text>Key metrics and analytics for event management</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Analytics</Tab>
          <Tab>Events</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                <Title>Total Registrations</Title>
                <Metric>18,364</Metric>
                <Text>+12.3% from last month</Text>
              </Card>
              <Card>
                <Title>Total Ticket Sales</Title>
                <Metric>$245,789</Metric>
                <Text>+5.7% from last month</Text>
              </Card>
              <Card>
                <Title>Active Events</Title>
                <Metric>24</Metric>
                <Text>+3 from last month</Text>
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>
                <Title>Registration & Sales Trends</Title>
                <AreaChart
                  className="h-72 mt-4"
                  data={chartdata}
                  index="date"
                  categories={["Event Registrations", "Ticket Sales"]}
                  colors={["blue", "cyan"]}
                  valueFormatter={valueFormatter}
                />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <Title>Monthly Performance</Title>
                <BarChart
                  className="h-72 mt-4"
                  data={chartdata}
                  index="date"
                  categories={["Event Registrations", "Ticket Sales"]}
                  colors={["blue", "cyan"]}
                  valueFormatter={valueFormatter}
                />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <Title>Event Attendance</Title>
                <Flex className="mt-4">
                  <DonutChart
                    className="h-40"
                    data={eventData}
                    category="attendees"
                    index="name"
                    valueFormatter={valueFormatter}
                    colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                  />
                  <Legend
                    className="max-w-xs"
                    categories={eventData.map((item) => item.name)}
                    colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                  />
                </Flex>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default TremorDashboard;