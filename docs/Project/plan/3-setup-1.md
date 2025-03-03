# Phase 3: Advanced Features for Medellin AI Event Platform

This document outlines the advanced phase of development for the Medellin AI event platform, building upon the foundation established in [Phase 1](./1-setup.md) and [Phase 2](./2-setup.md) to implement sophisticated features, integrations, and optimizations.

## 1. AI-Powered Event Recommendations

### 1.1 Recommendation Engine Integration

```typescript
// src/lib/ai/recommendationEngine.ts
import { createClient } from "@/lib/supabase";
import { getUserPreferences } from "@/lib/user";
import { calculateSimilarity, normalizeVector } from "@/lib/ai/vectorUtils";

interface EventVector {
  id: string;
  vector: number[];
  categories: string[];
  attendance: number;
  price: number;
}

/**
 * Generates event recommendations based on user preferences and behavior
 */
export async function generateEventRecommendations(
  userId: string,
  limit: number = 5
): Promise<string[]> {
  try {
    // Get user data and preferences
    const userPreferences = await getUserPreferences(userId);
    const supabase = createClient();

    // Fetch user's event history
    const { data: userEvents } = await supabase
      .from("attendees")
      .select("event_id")
      .eq("user_id", userId);

    const attendedEventIds = userEvents?.map((item) => item.event_id) || [];

    // Fetch all published events
    const { data: allEvents } = await supabase
      .from("events")
      .select(
        `
        id, 
        title, 
        description, 
        event_type,
        price,
        event_category_mapping(event_categories(name))
      `
      )
      .eq("is_published", true)
      .not("id", "in", `(${attendedEventIds.join(",")})`)
      .order("start_date", { ascending: true });

    if (!allEvents || allEvents.length === 0) {
      return [];
    }

    // Convert events to vectors for similarity calculation
    const eventVectors: EventVector[] = allEvents.map((event) => ({
      id: event.id,
      vector: createEventVector(
        event.title,
        event.description,
        event.event_category_mapping.map((m) => m.event_categories.name)
      ),
      categories: event.event_category_mapping.map(
        (m) => m.event_categories.name
      ),
      attendance: getEventPopularity(event.id),
      price: event.price || 0,
    }));

    // Calculate user's preference vector
    const userVector = createUserVector(userPreferences, attendedEventIds);

    // Score events based on similarity to user preferences
    const scoredEvents = eventVectors.map((ev) => ({
      id: ev.id,
      score: calculateRecommendationScore(ev, userVector, userPreferences),
    }));

    // Return top N event IDs
    return scoredEvents
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((e) => e.id);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return [];
  }
}

// Helper functions for vector creation and scoring
function createEventVector(
  title: string,
  description: string,
  categories: string[]
): number[] {
  // Implement vector embedding logic here
  // This would typically use NLP techniques to convert text to vector
  return [
    /* vector elements */
  ];
}

function createUserVector(
  preferences: any,
  attendedEvents: string[]
): number[] {
  // Create a vector representing user preferences and behavior
  return [
    /* vector elements */
  ];
}

function getEventPopularity(eventId: string): number {
  // Get event popularity score based on attendees, views, etc.
  return 0;
}

function calculateRecommendationScore(
  event: EventVector,
  userVector: number[],
  userPreferences: any
): number {
  // Calculate similarity between event and user preferences
  const contentSimilarity = calculateSimilarity(event.vector, userVector);

  // Factor in category preferences
  const categoryScore = event.categories.some((c) =>
    userPreferences.preferredCategories.includes(c)
  )
    ? 1.2
    : 1;

  // Factor in price preferences
  const priceMatch = event.price <= userPreferences.maxPrice ? 1.1 : 0.8;

  // Factor in popularity
  const popularityFactor = Math.log(event.attendance + 1) * 0.1;

  return contentSimilarity * categoryScore * priceMatch + popularityFactor;
}
```

### 1.2 Implementing the Recommendation UI

```tsx
// src/components/events/RecommendedEvents.tsx
"use client";

import { useEffect, useState } from "react";
import { generateEventRecommendations } from "@/lib/ai/recommendationEngine";
import { EventCard } from "@/components/ui/EventCard";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/Skeleton";
import { createClient } from "@/lib/supabase";

export function RecommendedEvents() {
  const { user } = useUser();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!user?.id) return;

      try {
        setIsLoading(true);

        // Get recommended event IDs
        const recommendedIds = await generateEventRecommendations(user.id, 3);

        if (recommendedIds.length === 0) {
          setEvents([]);
          return;
        }

        // Fetch full event details
        const supabase = createClient();
        const { data } = await supabase
          .from("events")
          .select("*")
          .in("id", recommendedIds)
          .order("start_date");

        setEvents(data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recommended for You</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
```

## 2. Advanced Analytics and Reporting

### 2.1 Enhanced Analytics Dashboard

```tsx
// src/app/dashboard/analytics/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, Title, Text } from "@tremor/react";
import { AnalyticsSummary } from "@/components/dashboard/analytics/AnalyticsSummary";
import { AttendeeGrowthChart } from "@/components/dashboard/analytics/AttendeeGrowthChart";
import { EventCategoryDistribution } from "@/components/dashboard/analytics/EventCategoryDistribution";
import { RevenueChart } from "@/components/dashboard/analytics/RevenueChart";
import { GeographicDistribution } from "@/components/dashboard/analytics/GeographicDistribution";
import { AnalyticsLoading } from "@/components/dashboard/analytics/AnalyticsLoading";
import { DateRangePicker } from "@/components/dashboard/analytics/DateRangePicker";
import { DownloadReportButton } from "@/components/dashboard/analytics/DownloadReportButton";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const startDate =
    typeof searchParams.start === "string" ? searchParams.start : undefined;
  const endDate =
    typeof searchParams.end === "string" ? searchParams.end : undefined;

  // Server-side data fetching for analytics
  const supabase = createServerComponentClient({ cookies });

  // Fetch summary data
  const { data: summaryData } = await supabase.rpc("get_analytics_summary", {
    start_date: startDate,
    end_date: endDate,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title>Advanced Analytics</Title>
          <Text>Detailed insights into your events and attendees</Text>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker />
          <DownloadReportButton />
        </div>
      </div>

      <Suspense fallback={<AnalyticsLoading />}>
        <AnalyticsSummary data={summaryData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Title>Attendee Growth</Title>
            <AttendeeGrowthChart startDate={startDate} endDate={endDate} />
          </Card>

          <Card>
            <Title>Revenue Trends</Title>
            <RevenueChart startDate={startDate} endDate={endDate} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <Title>Event Categories</Title>
            <EventCategoryDistribution />
          </Card>

          <Card>
            <Title>Geographic Distribution</Title>
            <GeographicDistribution />
          </Card>
        </div>
      </Suspense>
    </div>
  );
}
```

### 2.2 Custom Report Generation

```typescript
// src/lib/reports/reportGenerator.ts
import { createClient } from "@/lib/supabase";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

type ReportTimeframe = "week" | "month" | "quarter" | "year" | "custom";
type ReportFormat = "pdf" | "csv" | "json";

interface ReportOptions {
  timeframe: ReportTimeframe;
  startDate?: string;
  endDate?: string;
  eventId?: string;
  format: ReportFormat;
  includeCharts: boolean;
  sections: string[];
}

export async function generateReport(options: ReportOptions): Promise<Blob> {
  // Determine date range
  const { startDate, endDate } = calculateDateRange(options);

  // Fetch data
  const data = await fetchReportData(options, startDate, endDate);

  // Generate report in the requested format
  switch (options.format) {
    case "pdf":
      return generatePdfReport(data, options);
    case "csv":
      return generateCsvReport(data);
    case "json":
      return new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
    default:
      throw new Error(`Unsupported report format: ${options.format}`);
  }
}

async function fetchReportData(
  options: ReportOptions,
  startDate: string,
  endDate: string
) {
  const supabase = createClient();

  // Fetch different data based on requested sections
  const data: Record<string, any> = {
    metadata: {
      generated: new Date().toISOString(),
      timeframe: options.timeframe,
      startDate,
      endDate,
      eventId: options.eventId,
    },
  };

  // Fetch attendance data
  if (options.sections.includes("attendance")) {
    const { data: attendanceData } = await supabase.rpc(
      "get_attendance_report",
      {
        start_date: startDate,
        end_date: endDate,
        event_id: options.eventId || null,
      }
    );

    data.attendance = attendanceData;
  }

  // Fetch revenue data
  if (options.sections.includes("revenue")) {
    const { data: revenueData } = await supabase.rpc("get_revenue_report", {
      start_date: startDate,
      end_date: endDate,
      event_id: options.eventId || null,
    });

    data.revenue = revenueData;
  }

  // Fetch other data sections as needed

  return data;
}

async function generatePdfReport(
  data: Record<string, any>,
  options: ReportOptions
): Promise<Blob> {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text("Medellin AI Event Analytics Report", 14, 22);

  // Add report metadata
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), "PPP")}`, 14, 30);
  doc.text(
    `Period: ${format(new Date(data.metadata.startDate), "PPP")} - ${format(new Date(data.metadata.endDate), "PPP")}`,
    14,
    35
  );

  // Add charts if requested
  let yPosition = 40;
  if (options.includeCharts) {
    yPosition = await addChartsToReport(doc, data, yPosition);
  }

  // Add tables for each data section
  if (data.attendance) {
    yPosition = addAttendanceTable(doc, data.attendance, yPosition);
  }

  if (data.revenue) {
    yPosition = addRevenueTable(doc, data.revenue, yPosition);
  }

  // Add other sections as needed

  return doc.output("blob");
}

async function addChartsToReport(
  doc: any,
  data: Record<string, any>,
  yPosition: number
): Promise<number> {
  if (data.attendance) {
    // Generate attendance chart
    const chartCanvas = new ChartJSNodeCanvas({ width: 500, height: 300 });
    const chartConfig = {
      type: "line",
      data: {
        labels: data.attendance.map((item: any) => item.date),
        datasets: [
          {
            label: "Attendance",
            data: data.attendance.map((item: any) => item.count),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    };

    const buffer = await chartCanvas.renderToBuffer(chartConfig);
    doc.addImage(buffer, "PNG", 14, yPosition, 180, 100);
    yPosition += 110;
  }

  // Add more charts as needed

  return yPosition;
}

function addAttendanceTable(
  doc: any,
  attendanceData: any[],
  yPosition: number
): number {
  doc.setFontSize(14);
  doc.text("Attendance Summary", 14, yPosition);

  yPosition += 10;

  autoTable(doc, {
    startY: yPosition,
    head: [["Date", "Event", "Attendees", "Capacity", "Fill Rate"]],
    body: attendanceData.map((item) => [
      format(new Date(item.date), "PP"),
      item.event_name,
      item.count.toString(),
      item.capacity.toString(),
      `${Math.round((item.count / item.capacity) * 100)}%`,
    ]),
  });

  return doc.lastAutoTable.finalY + 10;
}

function addRevenueTable(
  doc: any,
  revenueData: any[],
  yPosition: number
): number {
  doc.setFontSize(14);
  doc.text("Revenue Summary", 14, yPosition);

  yPosition += 10;

  autoTable(doc, {
    startY: yPosition,
    head: [["Event", "Tickets Sold", "Revenue", "Average Price"]],
    body: revenueData.map((item) => [
      item.event_name,
      item.tickets_sold.toString(),
      `$${item.revenue.toFixed(2)}`,
      `$${(item.revenue / item.tickets_sold).toFixed(2)}`,
    ]),
  });

  return doc.lastAutoTable.finalY + 10;
}

function generateCsvReport(data: Record<string, any>): Blob {
  // Implementation for CSV format
  let csvContent = "";

  // Add metadata
  csvContent += `Report Generated,${new Date().toISOString()}\n`;
  csvContent += `Period,${data.metadata.startDate} to ${data.metadata.endDate}\n\n`;

  // Add attendance data if available
  if (data.attendance) {
    csvContent += "Attendance Data\n";
    csvContent += "Date,Event,Attendees,Capacity,Fill Rate\n";

    data.attendance.forEach((item: any) => {
      csvContent += `${item.date},${item.event_name},${item.count},${item.capacity},${Math.round((item.count / item.capacity) * 100)}%\n`;
    });

    csvContent += "\n";
  }

  // Add revenue data if available
  if (data.revenue) {
    csvContent += "Revenue Data\n";
    csvContent += "Event,Tickets Sold,Revenue,Average Price\n";

    data.revenue.forEach((item: any) => {
      csvContent += `${item.event_name},${item.tickets_sold},$${item.revenue.toFixed(2)},$${(item.revenue / item.tickets_sold).toFixed(2)}\n`;
    });
  }

  return new Blob([csvContent], { type: "text/csv" });
}

function calculateDateRange(options: ReportOptions): {
  startDate: string;
  endDate: string;
} {
  // If custom dates are provided, use them
  if (options.startDate && options.endDate) {
    return { startDate: options.startDate, endDate: options.endDate };
  }

  const now = new Date();
  let startDate: Date;

  // Calculate start date based on timeframe
  switch (options.timeframe) {
    case "week":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case "month":
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "quarter":
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 3);
      break;
    case "year":
      startDate = new Date(now);
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1); // Default to 1 month
  }

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: now.toISOString().split("T")[0],
  };
}
```

## 3. External Service Integrations

### 3.1 Payment Gateway Integration

```typescript
// src/lib/payments/paymentProvider.ts
import Stripe from "stripe";
import { createClient } from "@/lib/supabase";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

interface CreatePaymentOptions {
  eventId: string;
  userId: string;
  ticketType: string;
  quantity: number;
  metadata?: Record<string, string>;
}

export async function createPaymentIntent(options: CreatePaymentOptions) {
  try {
    const supabase = createClient();

    // Get event details
    const { data: event } = await supabase
      .from("events")
      .select("title, price")
      .eq("id", options.eventId)
      .single();

    if (!event) {
      throw new Error("Event not found");
    }

    // Get ticket type price if applicable
    let ticketPrice = event.price;
    if (options.ticketType) {
      const { data: ticketTypeData } = await supabase
        .from("ticket_types")
        .select("price")
        .eq("event_id", options.eventId)
        .eq("name", options.ticketType)
        .single();

      if (ticketTypeData) {
        ticketPrice = ticketTypeData.price;
      }
    }

    const amount = Math.round(ticketPrice * 100 * options.quantity); // Convert to cents

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        eventId: options.eventId,
        userId: options.userId,
        ticketType: options.ticketType,
        quantity: options.quantity.toString(),
        ...options.metadata,
      },
    });

    // Store payment intent in database
    await supabase.from("payment_intents").insert({
      id: paymentIntent.id,
      event_id: options.eventId,
      user_id: options.userId,
      amount: amount / 100, // Store in dollars
      status: paymentIntent.status,
      ticket_type: options.ticketType,
      quantity: options.quantity,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      amount: amount / 100,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

export async function handlePaymentWebhook(payload: any, signature: string) {
  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    const supabase = createClient();

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update payment intent status
        await supabase
          .from("payment_intents")
          .update({ status: "succeeded" })
          .eq("id", paymentIntent.id);

        // Create tickets
        const { eventId, userId, ticketType, quantity } =
          paymentIntent.metadata;
        await createTickets(
          eventId,
          userId,
          ticketType,
          parseInt(quantity, 10)
        );

        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update payment intent status
        await supabase
          .from("payment_intents")
          .update({ status: "failed" })
          .eq("id", paymentIntent.id);

        break;
      }
      // Handle other event types
    }

    return { success: true };
  } catch (error) {
    console.error("Error handling webhook:", error);
    throw error;
  }
}

async function createTickets(
  eventId: string,
  userId: string,
  ticketType: string,
  quantity: number
) {
  const supabase = createClient();

  // Generate tickets
  const tickets = Array.from({ length: quantity }, () => ({
    event_id: eventId,
    user_id: userId,
    ticket_type: ticketType,
    status: "issued",
    ticket_code: generateTicketCode(),
  }));

  // Insert tickets
  await supabase.from("tickets").insert(tickets);

  // Add user as attendee if not already
  const { data: existingAttendee } = await supabase
    .from("attendees")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();

  if (!existingAttendee) {
    await supabase.from("attendees").insert({
      event_id: eventId,
      user_id: userId,
      ticket_type: ticketType,
    });
  }
}

function generateTicketCode(): string {
  // Generate a unique ticket code (e.g., "EVNT-1234-ABCD")
  const prefix = "EVNT";
  const numeric = Math.floor(1000 + Math.random() * 9000).toString();
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";

  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${prefix}-${numeric}-${suffix}`;
}
```

### 3.2 Email Notification System

```typescript
// src/lib/notifications/emailService.ts
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { createClient } from '@/lib/supabase';
import { EventConfirmationEmail } from '@/components/emails/EventConfirmationEmail';
import { EventReminderEmail } from '@/components/emails/EventReminderEmail';
import { TicketEmail } from '@/components/emails/TicketEmail';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: any[];
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    const result = await transporter.sendMail({
      from: `"Medellin AI Events" <${process.env.EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    });

    // Log email sending
    const supabase = createClient();
    await supabase.from('email_logs').insert({
      recipient: options.to,
      subject: options.subject,
      message_id: result.messageId,
      status: 'sent',
    });

    return result;
  } catch (error) {
    console.error('Error sending email:', error);

    // Log email failure
    const supabase = createClient();
    await supabase.from('email_logs').insert({
      recipient: options.to,
      subject: options.subject,
      status: 'failed',
      error: (error as Error).message,
    });

    throw error;
  }
}

export async function sendEventConfirmation(userId: string, eventId: string, ticketId: string) {
  const supabase = createClient();

  // Get user data
  const { data: userData } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  if (!userData) {
    throw new Error('User not found');
  }

  // Get event data
  const { data: eventData } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (!eventData) {
    throw new Error('Event not found');
  }

  // Get ticket data
  const { data: ticketData } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketId)
    .single();

  if (!ticketData) {
    throw new Error('Ticket not found');
  }

  // Render email
  const emailHtml = render(
    <EventConfirmationEmail
      userName={userData.full_name}
      eventName={eventData.title}
      eventDate={new Date(eventData.start_date).toLocaleDateString()}
      eventLocation={eventData.location}
      ticketType={ticketData.ticket_type}
      ticketCode={ticketData.ticket_code}
    />
  );

  // Generate QR code for ticket
  const qrCode = await generateQRCode(ticketData.ticket_code);

  // Send email
  return sendEmail({
    to: userData.email,
    subject: `Your Ticket for ${eventData.title}`,
    html: emailHtml,
    attachments: [
      {
        filename: 'ticket-qr.png',
        content: qrCode,
        cid: 'ticket-qr', // Referenced in the HTML as <img src="cid:ticket-qr">
      },
    ],
  });
}

export async function sendEventReminders() {
  const supabase = createClient();

  // Get events happening tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('id, title, start_date, location')
    .gte('start_date', tomorrow.toISOString())
    .lt('start_date', dayAfterTomorrow.toISOString());

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return;
  }

  // For each event, get attendees and send reminders
  for (const event of upcomingEvents) {
    const { data: attendees } = await supabase
      .from('attendees')
      .select('user_id')
      .eq('event_id', event.id);

    if (!attendees || attendees.length === 0) {
      continue;
    }

    // Get user details
    const userIds = attendees.map(a => a.user_id);
    const { data: users } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .in('id', userIds);

    if (!users || users.length === 0) {
      continue;
    }

    // Send reminder to each user
    for (const user of users) {
      const emailHtml = render(
        <EventReminderEmail
          userName={user.full_name}
          eventName={event.title}
          eventDate={new Date(event.start_date).toLocaleDateString()}
          eventTime={new Date(event.start_date).toLocaleTimeString()}
          eventLocation={event.location}
        />
      );

      await sendEmail({
        to: user.email,
        subject: `Reminder: ${event.title} is Tomorrow!`,
        html: emailHtml,
      });
    }
  }
}

async function generateQRCode(ticketCode: string): Promise<Buffer> {
  // Implementation for generating QR code
  // This would typically use a library like 'qrcode'
  return Buffer.from('dummy-qr-code');
}
```

### 3.3 Maps and Location Integration

```typescript
// src/components/ui/Map/MapWithEvents.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

// Configure Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface Event {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number];
  start_date: string;
}

interface MapWithEventsProps {
  initialLocation?: [number, number];
  initialZoom?: number;
}

export function MapWithEvents({
  initialLocation = [6.2442, -75.5812], // Medellín coordinates
  initialZoom = 12,
}: MapWithEventsProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('events')
        .select('id, title, location, coordinates, start_date')
        .eq('is_published', true)
        .order('start_date');

      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events for map:', error);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialLocation,
      zoom: initialZoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [initialLocation, initialZoom]);

  // Load events
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Add event markers when events or map changes
  useEffect(() => {
    if (!map.current || events.length === 0) return;

    // Clear existing markers
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => {
      marker.remove();
    });

    // Add new markers
    events.forEach(event => {
      if (!event.coordinates) return;

      const markerElement = document.createElement('div');
      markerElement.className = 'event-marker';
      markerElement.innerHTML = `
        <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${event.title}</h3>
          <p class="text-sm">${event.location}</p>
          <p class="text-sm">${new Date(event.start_date).toLocaleDateString()}</p>
          <a href="/events/${event.id}" class="text-sm text-blue-500">View details</a>
        </div>
      `);

      new mapboxgl.Marker(markerElement)
        .setLngLat(event.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markerElement.addEventListener('click', () => {
        setActiveEventId(event.id);
      });
    });
  }, [events, map.current]);

  return (
    <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="h-full w-full" />

      {/* Event list overlay */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md max-h-[400px] overflow-y-auto w-64">
        <h3 className="font-bold mb-2">Upcoming Events</h3>
        <div className="space-y-2">
          {events.map(event => (
            <div
              key={event.id}
              className={`p-2 rounded cursor-pointer ${
                activeEventId === event.id ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => {
                setActiveEventId(event.id);
                if (map.current && event.coordinates) {
                  map.current.flyTo({
                    center: event.coordinates,
                    zoom: 14,
                  });
                }
              }}
            >
              <p className="font-medium">{event.title}</p>
              <p className="text-xs">{new Date(event.start_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            map.current?.flyTo({
              center: initialLocation,
              zoom: initialZoom,
            });
            setActiveEventId(null);
          }}
        >
          Reset View
        </Button>
        <Button
          size="sm"
          variant="default"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              position => {
                map.current?.flyTo({
                  center: [position.coords.longitude, position.coords.latitude],
                  zoom: 14,
                });
              },
              error => {
                console.error('Error getting location:', error);
              }
            );
          }}
        >
          My Location
        </Button>
      </div>
    </div>
  );
}
```

## 4. Mobile Optimization

### 4.1 Progressive Web App (PWA) Configuration

```typescript
// next.config.ts - with PWA configuration
import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})({
  // Your existing Next.js config
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["your-domain.com", "your-supabase-project.supabase.co"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
});

export default config;
```

Create a manifest.json file in the public directory:

```json
// public/manifest.json
{
  "name": "Medellin AI Event Platform",
  "short_name": "MedellinAI",
  "description": "AI-powered event platform for Medellin",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0070f3",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/icons/icon-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "/icons/icon-192x192-maskable.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-512x512-maskable.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/homepage.png",
      "type": "image/png",
      "sizes": "1280x720"
    },
    {
      "src": "/screenshots/events.png",
      "type": "image/png",
      "sizes": "1280x720"
    }
  ]
}
```

### 4.2 Responsive Components for Mobile

```typescript
// src/components/ui/ResponsiveEventCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ShareButton } from '@/components/ui/ShareButton';
import { AddToCalendarButton } from '@/components/ui/AddToCalendarButton';

interface ResponsiveEventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    image_url: string | null;
  };
  variant?: 'default' | 'compact' | 'featured';
}

export function ResponsiveEventCard({
  event,
  variant = 'default',
}: ResponsiveEventCardProps) {
  // Use different card layouts based on variant and screen size
  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-white">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <span className="text-xs text-gray-500">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="truncate text-sm font-medium">{event.title}</h3>
          <p className="text-xs text-gray-500">{formatDate(event.start_date)}</p>
        </div>

        <Link href={`/events/${event.id}`} className="flex-shrink-0">
          <Button size="sm" variant="ghost">View</Button>
        </Link>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-w-16 aspect-h-9 relative">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="mb-1 text-xl font-bold">{event.title}</h2>
          <div className="mb-2 flex items-center text-sm">
            <svg className="mr-1 h-4 w-4" /* SVG path */ />
            <span>{formatDate(event.start_date)}</span>
          </div>

          <div className="mb-3 flex items-center text-sm">
            <svg className="mr-1 h-4 w-4" /* SVG path */ />
            <span>{event.location}</span>
          </div>

          <div className="flex space-x-2">
            <Link href={`/events/${event.id}`} className="flex-1">
              <Button variant="default" className="w-full">
                View Event
              </Button>
            </Link>
            <ShareButton title={event.title} url={`/events/${event.id}`} />
            <AddToCalendarButton event={event} />
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md">
      <div className="aspect-w-16 aspect-h-9 relative">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>

        <div className="mb-2 flex items-center text-sm text-gray-500">
          <svg className="mr-1 h-4 w-4" /* SVG path */ />
          <span>{formatDate(event.start_date)}</span>
        </div>

        <div className="mb-3 flex items-center text-sm text-gray-500">
          <svg className="mr-1 h-4 w-4" /* SVG path */ />
          <span className="truncate">{event.location}</span>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <Link href={`/events/${event.id}`}>
            <Button variant="default">View Event</Button>
          </Link>

          <div className="flex space-x-1">
            <ShareButton title={event.title} url={`/events/${event.id}`} />
            <AddToCalendarButton event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 4.3 Mobile-First Layouts

```typescript
// src/app/layout.tsx
import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@/components/Analytics';
import { MobileNavigation } from '@/components/MobileNavigation';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Medellin AI',
    default: 'Medellin AI Event Platform',
  },
  description: 'AI-powered event platform for Medellin',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  themeColor: '#0070f3',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans">
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">
            {children}
          </div>
          <MobileNavigation />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
```

```typescript
// src/components/MobileNavigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  RiHome4Line,
  RiCalendarEventLine,
  RiSearchLine,
  RiUser3Line,
  RiMenu4Line
} from '@remixicon/react';

export function MobileNavigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navigation on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-50 flex h-16 justify-around border-t border-gray-200 bg-white transition-transform duration-300 md:hidden',
      visible ? 'translate-y-0' : 'translate-y-full'
    )}>
      <NavItem href="/" icon={RiHome4Line} label="Home" current={pathname === '/'} />
      <NavItem href="/events" icon={RiCalendarEventLine} label="Events" current={pathname.startsWith('/events')} />
      <NavItem href="/search" icon={RiSearchLine} label="Search" current={pathname.startsWith('/search')} />
      <NavItem href="/profile" icon={RiUser3Line} label="Profile" current={pathname.startsWith('/profile')} />
      <NavItem href="/menu" icon={RiMenu4Line} label="More" current={pathname.startsWith('/menu')} />
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  current: boolean;
}

function NavItem({ href, icon: Icon, label, current }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-1 flex-col items-center justify-center',
        current ? 'text-primary' : 'text-gray-500'
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="mt-1 text-xs">{label}</span>
    </Link>
  );
}
```

## 5. Advanced Security Measures

### 5.1 Rate Limiting and Protection

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create rate limiters
const publicRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '10 s'), // 20 requests per 10 seconds
  analytics: true,
});

const apiRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // IP-based rate limiting for public routes
  const ip = req.ip ?? '127.0.0.1';
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');

  // Skip rate limiting for static assets
  if (
    req.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2)$/)
  ) {
    return res;
  }

  // Apply different rate limits for API vs public routes
  const ratelimit = isApiRoute ? apiRatelimit : publicRatelimit;
  const identifier = `${ip}:${isApiRoute ? 'api' : 'public'}`;

  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
        'Retry-After': Math.floor((reset - Date.now()) / 1000).toString(),
      },
```
