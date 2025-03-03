home page events section

# Medellin AI Events Section Specification

## Overview
The Events Section is a key component of the Medellin AI homepage, showcasing upcoming AI events in a responsive, visually appealing grid layout. This document outlines the detailed specifications for implementing the Events Section.

## 1. Layout Structure

### Container & Spacing
- Full-width section with `container mx-auto` constraint
- Minimum viewport height: `min-h-screen`
- Vertical padding: `py-20` (5rem top and bottom)
- Horizontal padding: `px-4` (adjusts for different breakpoints)
- Background: System background color (`bg-background`)

### Responsive Grid System
```css
/* Mobile (Default) */
grid-cols-1

/* Tablet (md: 768px) */
md:grid-cols-2

/* Desktop (lg: 1024px) */
lg:grid-cols-3

/* Grid Properties */
gap-8 (2rem between items)
items-stretch (equal height cards)
```

## 2. Event Card Design

### Card Container
```css
/* Base Card Styles */
.event-card {
  @apply relative flex flex-col bg-card rounded-lg shadow-md overflow-hidden;
  @apply transition-all duration-300 ease-in-out;
  @apply hover:shadow-lg;
  @apply animate-fade-up;
}
```

### Image Area
- Aspect ratio: 16:9 (`aspect-ratio: 16/9`)
- Height: `h-48` (12rem)
- Image handling:
  - Object-fit: cover
  - Loading: lazy
  - Fallback: placeholder.svg
  - Gradient overlay: `bg-gradient-to-t from-black/60 to-transparent`

### Status & Category Indicators
```css
/* Position */
.status-badge {
  @apply absolute top-2 right-2;
}

/* Status Colors */
.status-today { @apply bg-green-500 }
.status-upcoming { @apply bg-blue-500 }
.status-past { @apply bg-gray-500 }
```

## 3. Card Content Structure

### Typography Hierarchy
```css
/* Title */
.card-title {
  @apply text-xl font-semibold mb-4;
  @apply line-clamp-2;
}

/* Date & Location */
.card-metadata {
  @apply text-sm text-muted-foreground;
  @apply flex items-center gap-2;
}

/* Description */
.card-description {
  @apply text-base text-muted-foreground;
  @apply line-clamp-3;
}
```

### Content Layout
```css
.card-content {
  @apply flex-1 flex flex-col p-6;
  @apply space-y-4;
}
```

## 4. Interactive Elements

### Hover States
```css
/* Card Hover */
.event-card:hover {
  @apply transform-gpu scale-[1.02];
  @apply shadow-lg;
}

/* Button Hover */
.card-button:hover {
  @apply bg-accent/90;
}
```

### Transitions
- Duration: 300ms
- Timing function: ease-in-out
- Properties to animate:
  - Transform
  - Shadow
  - Background color
  - Opacity

## 5. Loading States

### Skeleton Structure
```tsx
<div className="flex flex-col h-full rounded-lg overflow-hidden animate-pulse">
  <div className="h-48 bg-muted" />
  <div className="flex-1 p-6 space-y-4">
    <div className="h-6 bg-muted rounded w-3/4" />
    <div className="space-y-2">
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-4 bg-muted rounded w-1/3" />
    </div>
  </div>
</div>
```

### Loading Animation
- Use `animate-pulse` for skeleton loading
- Smooth fade-in transition when content loads
- Loading spinner for button states

## 6. Component Architecture

### Component Hierarchy
```
EventsSection/
├── EventsHeader/
│   ├── Title
│   └── Filters (optional)
├── EventsList/
│   ├── EventCard
│   ├── LoadingSkeleton
│   ├── ErrorState
│   └── EmptyState
└── EventsPagination/
```

### State Management
- Event data fetching with React Query
- Loading state handling
- Error boundary implementation
- Pagination state

## 7. Color System

### Theme Colors
```css
/* Background Colors */
--background: hsl(var(--background));
--card: hsl(var(--card));
--muted: hsl(var(--muted));

/* Text Colors */
--foreground: hsl(var(--foreground));
--muted-foreground: hsl(var(--muted-foreground));

/* Accent Colors */
--accent: hsl(var(--accent));
--accent-foreground: hsl(var(--accent-foreground));
```

### Status Colors
```css
/* Event Status */
--status-today: #22c55e;     /* green-500 */
--status-upcoming: #3b82f6;  /* blue-500 */
--status-past: #6b7280;      /* gray-500 */
```

## 8. Accessibility Requirements

### ARIA Attributes
```html
<!-- Card -->
<article role="article" aria-labelledby="event-title-{id}">
  <h3 id="event-title-{id}">{title}</h3>
</article>

<!-- Interactive Elements -->
<button aria-label="View event details">
<img alt="Event: {title}" loading="lazy">
```

### Keyboard Navigation
- Focusable cards with visible focus indicators
- Logical tab order
- Skip links for main content
- ARIA live regions for dynamic content

## 9. Performance Optimization

### Image Optimization
- Lazy loading for off-screen images
- Responsive image sizes
- Image format optimization (WebP with fallbacks)
- Blur-up placeholder loading

### Component Optimization
- React.memo for pure components
- Virtualization for long lists
- Debounced search/filter functions
- Optimistic UI updates

## 10. Analytics Integration

### Event Tracking
```typescript
interface EventAnalytics {
  event_type: 'view' | 'click' | 'register';
  event_id: string;
  user_id?: string;
  timestamp: number;
  metadata: {
    source: 'events_section';
    position: number;
    page: number;
  };
}
```

### Tracking Points
- Page view
- Card impressions
- Card clicks
- Registration attempts
- Filter usage
- Pagination interactions

## 11. Mobile Responsiveness

### Breakpoint System
```css
/* Base (Mobile First) */
.container { @apply px-4; }

/* Tablet (md: 768px) */
@screen md {
  .container { @apply px-6; }
}

/* Desktop (lg: 1024px) */
@screen lg {
  .container { @apply px-8; }
}

/* Large Desktop (xl: 1280px) */
@screen xl {
  .container { @apply px-10; }
}
```

### Touch Optimization
- Minimum touch target size: 44px
- Touch feedback states
- Swipe gestures for mobile navigation
- Optimized for thumb zones

## 12. SEO Considerations

### Meta Information
```html
<section>
  <h2>Upcoming AI Events in Medellín</h2>
  <!-- Structured data for events -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Event",
      // ... event specific data
    }
  </script>
</section>
```

### Content Structure
- Semantic HTML5 elements
- Proper heading hierarchy
- Descriptive alt text
- Meta descriptions for events

## Implementation Checklist

### Phase 1: Core Structure
- [ ] Basic grid layout
- [ ] Responsive container
- [ ] Card component shell
- [ ] Loading states

### Phase 2: Content & Styling
- [ ] Typography implementation
- [ ] Color system integration
- [ ] Image handling
- [ ] Interactive states

### Phase 3: Enhancement
- [ ] Accessibility implementation
- [ ] Analytics integration
- [ ] Performance optimization
- [ ] SEO implementation

### Phase 4: Testing & Validation
- [ ] Cross-browser testing
- [ ] Responsive testing
- [ ] Performance benchmarking
- [ ] Accessibility audit