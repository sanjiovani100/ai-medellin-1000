
# Events Page UI/UX Documentation

## Overview

The Events page serves as the central hub for discovering and interacting with AI-related events in Medellín. This document outlines the complete UI/UX implementation, including layout structure, components, interactions, and responsive behavior.

## 1. Page Layout & Wireframe

### Base Structure
```
+----------------+---------------------------+
|    Fixed       |                          |
|    Header      |                          |
+----------------+---------------------------+
|                |                          |
|    Sidebar     |      Main Content        |
|    (280px)     |      Area               |
|                |                          |
|    Filters     |      Event Grid          |
|                |                          |
|                |                          |
+----------------+---------------------------+
```

### Key Layout Features
- Two-panel responsive layout
- Fixed header with blur effect (bg-background/80 backdrop-blur-sm)
- Full-height design (min-h-screen)
- Sidebar: 280px width on desktop
- Content area: Flexible width with responsive padding

### Responsive Breakpoints
- Mobile: < 768px (Single column, overlay sidebar)
- Tablet: 768px - 1024px (Two columns)
- Desktop: > 1024px (Three columns)

## 2. Main Components & Structure

### 2.1 Sidebar Panel

#### Filter Components
- Search Input
  - Full width text input
  - Placeholder: "Search events..."
  - Real-time filtering

- Date Range Picker
  - Calendar dropdown
  - Range selection
  - Clear date option
  - Format: "MMM dd, yyyy"

- Category Filter
  - Multi-select capability
  - Badge display of selected
  - Clear selection option
  - Searchable dropdown

- Location Filter
  - Single select dropdown
  - Preset locations
  - All locations option

- Reset Filters
  - Clear all button
  - Visual feedback on click
  - Resets all filters to default

#### Mobile Implementation
- Floating action button (bottom-right)
- Overlay sidebar with backdrop
- Smooth slide-in animation
- Close button in overlay

### 2.2 Main Content Area

#### Header Section
- Page title: "Events"
- Submit Event button (primary variant)
- Responsive spacing

#### Event Grid
```
Desktop Layout (3 columns):
+--------+ +--------+ +--------+
| Event  | | Event  | | Event  |
| Card   | | Card   | | Card   |
+--------+ +--------+ +--------+
+--------+ +--------+ +--------+
| Event  | | Event  | | Event  |
| Card   | | Card   | | Card   |
+--------+ +--------+ +--------+

Tablet Layout (2 columns):
+--------+ +--------+
| Event  | | Event  |
| Card   | | Card   |
+--------+ +--------+
+--------+ +--------+
| Event  | | Event  |
| Card   | | Card   |
+--------+ +--------+

Mobile Layout (1 column):
+--------+
| Event  |
| Card   |
+--------+
+--------+
| Event  |
| Card   |
+--------+
```

#### Grid Specifications
- Gap: 8px (gap-8)
- Responsive columns:
  - Mobile: 1 column
  - Tablet: 2 columns (md:grid-cols-2)
  - Desktop: 3 columns (lg:grid-cols-3)
- 6 items per page
- Pagination controls

### 2.3 Event Card Component

#### Card Layout
```
+------------------------+
|      Image Area        |
|      (h-48)           |
|                       |
| [Status] [Category]   |
+------------------------+
|      Title            |
|      Date             |
|      Description      |
|                       |
|   [View Details]      |
+------------------------+
```

#### Card Features
- Responsive image container (h-48)
- Status badge (Today/Past/Upcoming)
  - Today: bg-green-500
  - Past: bg-gray-500
  - Upcoming: bg-blue-500
- Category badge (outline variant)
- Title with line clamp (2 lines)
- Date with calendar icon
- Description with line clamp (3 lines)
- View Details button
- Hover effects:
  - Shadow elevation
  - Scale transform
  - Smooth transition

### 2.4 Event Details Dialog

#### Dialog Structure
```
+-------------------------+
|  Title                  |
|  Description           X|
+-------------------------+
|                        |
|      Large Image       |
|                        |
+-------------------------+
|   Event Information    |
|   - Date              |
|   - Location          |
|   - Category          |
+-------------------------+
|   Registration         |
|   [Register Button]    |
+-------------------------+
```

#### Dialog Features
- Responsive sizing
- Backdrop blur
- Close button
- Image optimization
- Action buttons
- Registration form

## 3. User Interaction Patterns

### 3.1 Filter Interactions
- Real-time search filtering
- Date range selection
- Category multi-select/deselect
- Location dropdown selection
- Clear all filters
- Filter state persistence

### 3.2 Card Interactions
- Hover effects
- Click to open dialog
- Image loading states
- Error handling
- Registration flow

### 3.3 Navigation
- Pagination controls
- Mobile sidebar toggle
- Dialog open/close
- Form submission
- Error recovery

## 4. Visual Design Elements

### 4.1 Color System
- Primary: White (#FFFFFF)
- Secondary: Black (#000000)
- Accent: Orange (#f0562e)
- Status Colors:
  - Today: Green (#22c55e)
  - Past: Gray (#6b7280)
  - Upcoming: Blue (#3b82f6)

### 4.2 Typography
- Headings: Montserrat
- Body: Inter
- Size Scale:
  - Mobile: 14px-24px
  - Desktop: 16px-32px

### 4.3 Interactive States
- Hover effects
- Active states
- Focus indicators
- Loading states
- Error states
- Success feedback

## 5. Responsive Behavior

### 5.1 Mobile Adaptations
- Sidebar becomes overlay
- Single column grid
- Larger touch targets
- Simplified filters
- Optimized images

### 5.2 Tablet Adaptations
- Two column grid
- Balanced spacing
- Responsive typography
- Optimized layout

### 5.3 Desktop Optimizations
- Three column grid
- Sidebar always visible
- Enhanced hover states
- Maximum width container

## 6. Image Implementation

### 6.1 Image Handling
- Aspect ratio: 16:9
- Progressive loading
- Blur placeholder
- Error fallback
- Optimized formats

### 6.2 Performance
- Lazy loading
- Size optimization
- Cache strategy
- CDN delivery
- Format selection

## 7. Technical Considerations

### 7.1 State Management
- React Query for data
- Local state for UI
- Filter preferences
- Pagination state
- Modal state

### 7.2 Performance Optimization
- Code splitting
- Image optimization
- Caching strategy
- Lazy loading
- Debounced search

### 7.3 Accessibility Features
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast

### 7.4 Error Handling
- Loading states
- Error boundaries
- Fallback UI
- User feedback
- Recovery options

## 8. Component Relationships
```
EventsPage
├── EventsLayout
│   ├── Header
│   ├── EventsSidebar
│   │   ├── SearchFilter
│   │   ├── DateFilter
│   │   ├── CategoryFilter
│   │   └── LocationFilter
│   └── EventsList
│       ├── EventCard
│       │   └── EventDialog
│       └── EventsPagination
└── Footer
```

This documentation provides a comprehensive overview of the Events page implementation, serving as a reference for development and maintenance.
