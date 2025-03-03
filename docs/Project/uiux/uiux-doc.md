# Medellin AI Platform - User Interface Description Document

## Overview
This document outlines the user interface design system for the Medellin AI Platform, based on the integration of Solar Template for public-facing pages and Tremor Dashboard for administrative interfaces. The design system prioritizes clarity, accessibility, and consistency while maintaining a modern, professional aesthetic.

## 1. Layout Structure

### Public Pages (Solar Template)
- **Header**
  - Fixed navigation bar with transparent-to-solid scroll behavior
  - Right-aligned authentication buttons
  - Centered logo placement
  - Language selector (ES/EN)

- **Main Content Area**
  - Full-width hero sections with gradient backgrounds
  - Content width constrained to max-w-4xl for readability
  - Card-based content layout with consistent spacing
  - Footer with multi-column layout

### Dashboard (Tremor Template)
- **Left Sidebar**
  - Fixed position navigation
  - Collapsible menu structure
  - User profile section
  - Quick action buttons

- **Main Dashboard Area**
  - Top navigation bar with breadcrumbs
  - Content grid system with responsive breakpoints
  - Card-based widget layout
  - Contextual action buttons

## 2. Core Components

### Navigation Components
- **Primary Navigation**
  - Transparent background with blur effect
  - Hover and active states with subtle transitions
  - Mobile-responsive hamburger menu
  - Dropdown support for nested items

- **Dashboard Navigation**
  - Icon + Text menu items
  - Collapsible categories
  - Active state indicators
  - Quick access shortcuts

### Content Components
- **Cards**
  - Consistent padding (p-6)
  - Light shadow (tremor-card)
  - Rounded corners (tremor-default)
  - Hover state animations

- **Forms**
  - Floating label inputs
  - Inline validation
  - Helper text support
  - Action button alignment

### Interactive Elements
- **Buttons**
  - Primary: Solid background with hover state
  - Secondary: Outlined style
  - Tertiary: Text-only with hover underline
  - Icon buttons with tooltips

- **Data Display**
  - Tables with sortable columns
  - Charts and graphs
  - Status indicators
  - Progress bars

## 3. Visual Design Elements

### Color System
- **Solar Template (Public Pages)**
  - Primary: #F97316 (Orange-500)
  - Text: #0f172a (Slate-900)
  - Background: #ffffff
  - Accent: #f0562e

- **Tremor Template (Dashboard)**
  - Brand: {
    - Default: #3b82f6 (Blue-500)
    - Faint: #eff6ff (Blue-50)
    - Muted: #bfdbfe (Blue-200)
    - Subtle: #60a5fa (Blue-400)
    - Emphasis: #1d4ed8 (Blue-700)
  }
  - Background: {
    - Default: #ffffff
    - Muted: #f9fafb (Gray-50)
    - Subtle: #f3f4f6 (Gray-100)
    - Emphasis: #374151 (Gray-700)
  }

- **Shared Color Palette**
  - Neutral: slate, gray, zinc, neutral, stone
  - Status: {
    - Success: green (#22c55e), emerald (#10b981)
    - Warning: amber (#f59e0b), yellow (#eab308)
    - Error: red (#ef4444), rose (#f43f5e)
    - Info: blue (#3b82f6), sky (#0ea5e9)
  }
  - Accent: {
    - Purple: #a855f7
    - Fuchsia: #d946ef
    - Pink: #ec4899
  }

### Spacing System
- Base unit: 0.25rem (4px)
- Content padding: 1.5rem (24px)
- Component spacing: 1rem (16px)
- Section spacing: 2.5rem (40px)

### Icon System
- Line icons for navigation
- Solid icons for actions
- 24px default size
- Consistent stroke width

## 4. Typography

### Font Families
- Primary: Inter for body text
- Secondary: Montserrat for headings
- Monospace: Consolas for code

### Type Scale
- Label: 0.75rem
- Default: 0.875rem
- Title: 1.125rem
- Metric: 1.875rem

### Heading Hierarchy
- H1: 2.25rem (36px)
- H2: 1.875rem (30px)
- H3: 1.5rem (24px)
- H4: 1.25rem (20px)

## 5. Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

### Responsive Patterns
- **Mobile**
  - Single column layout
  - Bottom navigation bar
  - Collapsible sidebar
  - Stacked cards

- **Tablet**
  - Two column grid
  - Side navigation
  - Expandable panels
  - Flexible card layouts

- **Desktop**
  - Multi-column grid
  - Persistent sidebar
  - Advanced data visualization
  - Complex layouts

## 6. Accessibility

### Visual Accessibility
- Minimum contrast ratio: 4.5:1
- Focus indicators on all interactive elements
- Scalable text up to 200%
- Icon + text labels for clarity

### Keyboard Navigation
- Logical tab order
- Skip navigation links
- Focus trap in modals
- Keyboard shortcuts for power users

### Screen Reader Support
- ARIA labels on interactive elements
- Semantic HTML structure
- Alternative text for images
- Status announcements

### Responsive Interactions
- Touch targets minimum 44x44px
- Hover/focus states
- Loading indicators
- Error state feedback

## 7. Component States

### Interactive States
- Default
- Hover
- Active
- Focus
- Disabled
- Loading
- Error
- Success

### Animation Guidelines
- **Timing**
  - Duration: 150ms
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)

- **Standard Animations**
  - Fade in/out
  - Slide with fade (down, left, up, right)
  - Dialog overlay transitions
  - Drawer animations
  - Content show/hide

- **Interactive Animations**
  - Button hover/active states
  - Form focus states
  - Menu transitions
  - Modal/dialog transitions

### Theme Support
- **Light Mode** (Default)
  - Uses defined color system
  - High contrast for accessibility
  - Subtle shadows and depth

- **Dark Mode**
  - Selector-based implementation
  - Inverted color scheme
  - Adjusted contrast ratios
  - Modified shadow effects

## 8. Implementation Notes

### Performance Considerations
- Lazy loading for off-screen content
- Image optimization
- Code splitting
- Caching strategies

### Browser Support
- Modern browsers (last 2 versions)
- Progressive enhancement
- Fallback patterns
- Cross-browser testing

### Form Styling
- **Input Elements**
  - Custom styling via @tailwindcss/forms
  - Consistent padding and spacing
  - Focus ring effects
  - Error state indicators

- **Form Layout**
  - Grid-based form layouts
  - Responsive input sizing
  - Label alignment options
  - Help text positioning

This document serves as a living guide for maintaining consistency across the Medellin AI Platform's user interface. All new features and components should adhere to these guidelines while maintaining flexibility for future enhancements. 