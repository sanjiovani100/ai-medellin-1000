"use client";

import React, { useState } from "react";
import { cx } from "@/lib/utils";

// Import Tremor components from our organized structure
import {
  // Input components
  DatePicker,
  DateRangePicker,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Textarea,
} from "@/components/tremor/inputs";

import {
  // UI components
  Card,
  Divider,
  Flex,
  Grid,
  Legend,
  List,
  ListItem,
  Metric,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
  // Chart components
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
} from "@/components/tremor/ui";

// Sample data for charts
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

const TremorComponentsDemo = () => {
  const [selectedView, setSelectedView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2023, 0, 1));
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });
  const [numberValue, setNumberValue] = useState(100);
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  // Custom handler for DateRangePicker to handle type conversion
  const handleDateRangeChange = (value: any) => {
    setSelectedRange({
      from: value?.from || undefined,
      to: value?.to || undefined,
    });
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <Title>Tremor Components Demo</Title>
      <Text>Showcasing all available Tremor components</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Input Components</Tab>
          <Tab>UI Components</Tab>
          <Tab>Charts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card className="mt-4 p-4">
              <Title>Input Components</Title>
              <Divider className="my-4" />
              
              <Grid numItemsMd={2} className="gap-6">
                <div>
                  <Text className="mb-2">TextInput</Text>
                  <TextInput 
                    placeholder="Enter text..." 
                    value={textValue}
                    onValueChange={setTextValue}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">NumberInput</Text>
                  <NumberInput 
                    placeholder="Enter number..." 
                    value={numberValue}
                    onValueChange={setNumberValue}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Textarea</Text>
                  <Textarea 
                    placeholder="Enter long text..." 
                    value={textareaValue}
                    onValueChange={setTextareaValue}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">Select</Text>
                  <Select 
                    value={selectedView}
                    onValueChange={setSelectedView}
                  >
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </Select>
                </div>
                
                <div>
                  <Text className="mb-2">DatePicker</Text>
                  <DatePicker 
                    className="max-w-md"
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  />
                </div>
                
                <div>
                  <Text className="mb-2">DateRangePicker</Text>
                  <DateRangePicker 
                    className="max-w-md"
                    value={selectedRange}
                    onValueChange={handleDateRangeChange}
                  />
                </div>
              </Grid>
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card className="mt-4 p-4">
              <Title>UI Components</Title>
              <Divider className="my-4" />
              
              <div className="space-y-6">
                <div>
                  <Text className="mb-2">Card with Metric</Text>
                  <Grid numItemsMd={3} className="gap-6">
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
                </div>
                
                <div>
                  <Text className="mb-2">List</Text>
                  <Card>
                    <List>
                      <ListItem>
                        <span>Tech Conference</span>
                        <span>1,230 attendees</span>
                      </ListItem>
                      <ListItem>
                        <span>AI Workshop</span>
                        <span>751 attendees</span>
                      </ListItem>
                      <ListItem>
                        <span>Startup Meetup</span>
                        <span>471 attendees</span>
                      </ListItem>
                    </List>
                  </Card>
                </div>
                
                <div>
                  <Text className="mb-2">Table</Text>
                  <Card>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Event</TableHeaderCell>
                          <TableHeaderCell>Attendees</TableHeaderCell>
                          <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {eventData.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.attendees}</TableCell>
                            <TableCell>
                              <span className={cx(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                item.attendees > 500 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              )}>
                                {item.attendees > 500 ? "High" : "Medium"}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              </div>
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card className="mt-4 p-4">
              <Title>Chart Components</Title>
              <Divider className="my-4" />
              
              <div className="space-y-8">
                <div>
                  <Text className="mb-2">AreaChart</Text>
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
                
                <div>
                  <Text className="mb-2">BarChart</Text>
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
                
                <div>
                  <Text className="mb-2">DonutChart</Text>
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
                
                <div>
                  <Text className="mb-2">LineChart</Text>
                  <Card>
                    <Title>Trend Analysis</Title>
                    <LineChart
                      className="h-72 mt-4"
                      data={chartdata}
                      index="date"
                      categories={["Event Registrations", "Ticket Sales"]}
                      colors={["blue", "cyan"]}
                      valueFormatter={valueFormatter}
                    />
                  </Card>
                </div>
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default TremorComponentsDemo;