# Medellin AI Event Platform - UI/UX Documentation

## 1. Introduction

This document serves as the comprehensive UI/UX reference for the Medellin AI Event Platform. It defines the design system, components, patterns, and guidelines to ensure a consistent, accessible, and high-quality user experience across the platform. This documentation is intended for designers, developers, and product managers working on the platform and complements the technical specifications and feature documentation by focusing on user interface implementation and experience design.

## 2. Design System Documentation

### 2.1 Solar Template Adaptation

The Medellin AI Event Platform design system builds upon the Solar template framework while incorporating unique elements specific to event management and the Medellin brand identity. This approach provides a solid foundation of tested components while allowing for customization to meet the platform's specific needs.

Core adaptations include:

- Enhanced color system reflecting Medellin's vibrant culture
- Extended component set for event-specific functionality
- Custom iconography for industry-specific features
- Optimized mobile interactions for event discovery and ticketing

### 2.2 Design Principles

1. **Clarity First**: Information hierarchy and interaction paths must be immediately clear
2. **Contextual Intelligence**: Show users the right information at the right time
3. **Inclusive Design**: Create experiences accessible to all users regardless of ability
4. **Efficiency Through Consistency**: Maintain consistent patterns to reduce cognitive load
5. **Delight Through Details**: Add thoughtful micro-interactions and visual polish

### 2.3 Design Tokens

#### 2.3.1 Color System

```
Primary Colors:
- primary-100: #E6F0FF (light blue tint)
- primary-500: #2563EB (brand blue)
- primary-900: #1E40AF (dark blue shade)

Secondary Colors:
- secondary-100: #FFF7E6 (light gold tint)
- secondary-500: #F59E0B (gold accent)
- secondary-900: #B45309 (dark gold shade)

Semantic Colors:
- success: #10B981 (green)
- warning: #FBBF24 (amber)
- error: #EF4444 (red)
- info: #3B82F6 (blue)

Neutral Colors:
- gray-50: #F9FAFB (background)
- gray-100: #F3F4F6 (card background)
- gray-300: #D1D5DB (border)
- gray-500: #6B7280 (placeholder text)
- gray-700: #374151 (secondary text)
- gray-900: #111827 (primary text)
```

#### 2.3.2 Typography

```
Font Families:
- Primary: Inter, system-ui, sans-serif
- Secondary: Montserrat, Georgia, serif
- Monospace: JetBrains Mono, Consolas, monospace

Font Sizes:
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

Font Weights:
- light: 300
- regular: 400
- medium: 500
- semibold: 600
- bold: 700
```

#### 2.3.3 Spacing and Grid

```
Spacing Scale:
- space-0: 0px
- space-1: 0.25rem (4px)
- space-2: 0.5rem (8px)
- space-3: 0.75rem (12px)
- space-4: 1rem (16px)
- space-6: 1.5rem (24px)
- space-8: 2rem (32px)
- space-12: 3rem (48px)
- space-16: 4rem (64px)
- space-20: 5rem (80px)

Grid:
- 12-column grid system
- Gutter width: 24px
- Container max-width: 1280px
- Container padding: 24px (desktop), 16px (mobile)
```

#### 2.3.4 Elevation and Shadows

```
shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

### 2.4 Accessibility Standards

The platform targets WCAG 2.1 AA compliance with key considerations:

- Minimum contrast ratio of 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation for all interactive elements
- Screen reader compatibility through proper ARIA attributes
- Focus states clearly visible for all interactive elements
- Touch targets minimum 44x44px on mobile devices

### 2.5 Design-to-Code Workflow

1. Designs created in Figma with components mapped to the Solar component library
2. Design tokens exported to JSON for integration with the codebase
3. Handoff through Figma with developer notes and implementation guidelines
4. Storybook implementation for component development and documentation
5. Visual regression testing comparing implementation to design specifications

## 3. Component Library

### 3.1 Component Architecture

The component library follows an atomic design methodology with five levels:

1. **Atoms**: Basic UI elements (buttons, inputs, icons)
2. **Molecules**: Simple groups of UI elements (input groups, card headers)
3. **Organisms**: Complex UI components (forms, cards, navigation bars)
4. **Templates**: Page-level component arrangements
5. **Pages**: Specific implementations of templates with real content

All components leverage the Solar template foundation with Medellin AI-specific customizations.

### 3.2 Core Components

#### 3.2.1 Button Component

```jsx
// Primary Button Example
<Button variant="primary" size="md" onClick={handleClick}>
  Register Now
</Button>

// Props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
}
```

Button variants include primary (blue), secondary (gold), tertiary (white), outline, ghost, and danger (red). Buttons support loading states, disabled states, and icon placements.

#### 3.2.2 Card Component

Cards follow a consistent structure with optional header, body, footer, and action areas. Cards support hover effects, selectable states, and various content types.

```jsx
<Card variant="elevated" isSelectable={false} isHighlighted={false}>
  <CardHeader title="Event Name" subtitle="Event Date" />
  <CardBody>
    <EventDetails />
  </CardBody>
  <CardFooter>
    <Button variant="primary">Register</Button>
  </CardFooter>
</Card>
```

#### 3.2.3 Form Components

Form components include:

- Text inputs (single and multi-line)
- Select dropdowns
- Checkboxes and radio groups
- Date and time pickers
- File uploads
- Range sliders
- Toggle switches

All form components support:

- Labels and placeholder text
- Helper text and error messages
- Validation states
- Disabled states
- Required field indicators

#### 3.2.4 Navigation Components

The platform implements consistent navigation patterns:

- Primary navigation (top bar)
- Secondary navigation (side menu)
- Mobile navigation (bottom bar)
- Breadcrumbs for deep pages
- Tabs for content organization
- Pagination for long lists

#### 3.2.5 Data Visualization Components

Charts and visualizations use the Tremor library integrated with the Solar design system:

- Bar and line charts for analytics
- Pie charts for distribution data
- Progress indicators for goals
- Trend indicators for metrics
- Heatmaps for scheduling

### 3.3 Event-Specific Components

Custom components for event management include:

- Event cards with rich metadata
- Schedule timeline grids
- Venue seat maps
- Ticket type selectors
- Speaker profiles
- Session agenda blocks
- Check-in scanners
- Event preview banners

### 3.4 State Management

Components follow consistent state patterns:

- Default state
- Hover state
- Active/pressed state
- Focus state
- Disabled state
- Loading state
- Error state
- Success state

Interactive components implement proper keyboard focus management and screen reader announcements for state changes.

## 4. Style Guides

### 4.1 Brand Identity Integration

#### 4.1.1 Logo Usage

- Minimum clear space: Equal to the height of the logo mark
- Minimum size: 24px height
- Preferred placement: Top left in navigation or centered in authentication screens
- Logo variations: Full color (primary), white (reverse), and monochrome

#### 4.1.2 Color Application

- Primary blue used for primary actions, links, and key UI elements
- Secondary gold used for highlights, accents, and secondary actions
- Semantic colors reserved for their respective meanings (error, success, etc.)
- Neutral grays used for text, backgrounds, and borders
- Color combinations must meet WCAG contrast requirements

#### 4.1.3 Typography Implementation

- Inter font for all UI text and content
- Montserrat for headings and feature text
- Font weights used consistently (regular for body, medium for subheadings, semibold for headings)
- Line heights optimized for readability (1.5 for body text, 1.2 for headings)

### 4.2 Content Style Guide

#### 4.2.1 Microcopy Standards

- Clear, concise, and conversational tone
- Active voice preferred over passive
- First person for user actions ("I want to register")
- Second person for guidance ("You can create an event")
- Consistency in terminology across the platform

#### 4.2.2 UI Text Patterns

Error messages:

- Clearly state what went wrong
- Provide actionable guidance for recovery
- Avoid technical jargon
- Example: "We couldn't process your payment. Please check your card details and try again."

Button labels:

- Use verbs for actions ("Register", not "Registration")
- Be specific about the action ("Save Changes" vs. "Submit")
- Keep labels concise (1-3 words maximum)

Form labels and help text:

- Clear, descriptive labels
- Helper text for complex fields
- Consistent formatting for required fields
- Inline validation feedback

### 4.3 Iconography System

- Primary icon set: Phosphor Icons (integrated with Solar)
- Consistent sizing: 16px for inline, 20px for UI elements, 24px for features
- 1px stroke weight for outline icons
- Solid variants for selected/active states
- Custom event-specific icons follow the same style guidelines

### 4.4 Imagery Guidelines

- Event imagery follows a vibrant, energetic aesthetic
- Photos should be high-quality, diverse, and authentic
- Illustrations use the platform's color palette and geometric style
- Background patterns subtle and non-distracting
- Image aspect ratios standardized for consistency

## 5. User Flow Diagrams

### 5.1 User Registration and Onboarding

The registration flow follows these key steps:

1. Initial signup (email/password or social auth)
2. Profile creation with essential information
3. Preference selection for event recommendations
4. Email verification
5. Welcome tutorial (skippable)
6. Recommendation of events based on preferences

Decision points include:

- Social vs. email authentication paths
- Optional vs. required profile fields
- Skippable vs. required onboarding steps

Error states handled:

- Invalid email formats
- Weak passwords
- Existing email accounts
- Failed social authentication

### 5.2 Event Discovery and Browsing

Event discovery follows multiple entry paths:

1. Featured events on homepage
2. Category browsing
3. Search functionality
4. AI-powered recommendations
5. Location-based suggestions

The discovery flow implements:

- Progressive loading for performance
- Faceted filtering for refinement
- List and grid view options
- Quick action buttons for registration

### 5.3 Ticket Purchase Process

The ticket purchase flow includes:

1. Ticket type selection
2. Quantity selection
3. Attendee information collection
4. Optional add-ons
5. Payment processing
6. Confirmation and ticket delivery

Critical considerations:

- Timeout handling for reserved tickets
- Clear pricing breakdown
- Multiple payment method support
- Order confirmation across channels

### 5.4 Event Creation Workflow

Event creation follows a multi-step wizard:

1. Basic information (name, type, dates)
2. Location details (venue, virtual, hybrid)
3. Ticket configuration
4. Schedule building
5. Speaker/performer addition
6. Promotion settings
7. Preview and publish

The flow supports:

- Saving drafts at any stage
- Preview across device types
- Validation before publication
- Duplicating existing events

### 5.5 Analytics and Measurement

All user flows incorporate:

- Page view tracking
- Key conversion events
- Drop-off point identification
- A/B testing capabilities
- Performance metrics collection

## 6. Responsive Design Considerations

### 6.1 Breakpoint System

The platform follows these breakpoints:

- Mobile: 0-639px
- Tablet: 640-1023px
- Desktop: 1024-1279px
- Large Desktop: 1280px+

Implemented using Tailwind CSS breakpoint system:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### 6.2 Mobile-First Approach

All components and layouts are designed for mobile first, then enhanced for larger screens:

- Single-column layouts on mobile expanding to multi-column on larger screens
- Touch-friendly targets (minimum 44x44px)
- Simplified navigation on mobile (bottom bar) expanding to full navigation on desktop
- Collapsible sections to preserve vertical space on mobile

### 6.3 Key Responsive Patterns

#### 6.3.1 Navigation Transformation

- Mobile: Bottom navigation bar with key actions
- Tablet: Collapsible side navigation
- Desktop: Full horizontal navigation with dropdowns

#### 6.3.2 Card Layouts

- Mobile: Single column, full width
- Tablet: Two column grid
- Desktop: Three or four column grid

#### 6.3.3 Form Adaptations

- Stacked labels on mobile (above inputs)
- Side-by-side labels on desktop (beside inputs)
- Full-width inputs on mobile
- Date picker adaptations for touch interfaces

### 6.4 Performance Considerations

- Adaptive image loading based on screen size and connection
- Component-level code splitting
- Reduced animation on low-power devices
- Efficient re-rendering strategies for responsive changes

## 7. Implementation Guidelines

### 7.1 Technology Integration

The UI implementation leverages:

- Next.js for the application framework
- Tailwind CSS for styling
- React components from the Solar template
- Custom components for Medellin AI specific needs

Tailwind configuration extends the Solar design system:

```js
// tailwind.config.js example
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E6F0FF",
          500: "#2563EB",
          900: "#1E40AF",
        },
        // other custom colors
      },
      // other theme extensions
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
```

### 7.2 Component Implementation

Components follow consistent patterns:

- Functional components with TypeScript typing
- Props interfaces with JSDoc comments
- Forwarded refs for accessibility
- Composition pattern for complex components
- Context providers for shared state

### 7.3 Accessibility Implementation

Key accessibility features:

- Semantic HTML elements
- ARIA attributes for complex widgets
- Focus management for modals and dialogs
- Keyboard navigation support
- Skip links for screen readers
- Proper heading hierarchy

Test approach:

- Automated accessibility testing with jest-axe
- Manual testing with screen readers
- Keyboard-only usage testing

## 8. Design System Governance

### 8.1 Contribution Process

1. Identify need for new component or pattern
2. Draft proposal with use cases and requirements
3. Design review with senior designers
4. Development and implementation
5. Documentation update
6. Release and announcement

### 8.2 Versioning Strategy

- Semantic versioning (MAJOR.MINOR.PATCH)
- Breaking changes trigger major version updates
- New features trigger minor version updates
- Bug fixes and refinements trigger patch updates
- Deprecation notices provided at least one major version before removal

### 8.3 Documentation Maintenance

- Centralized documentation in Storybook
- Regular audits for accuracy
- Version history and changelog
- Example implementations for all components
- Accessibility guidelines for each component
