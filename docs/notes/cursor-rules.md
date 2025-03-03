# Medellin AI Platform - Cursor Development Rules

## 1. Code Organization & Structure

### File Naming Conventions
- Use kebab-case for file names: `event-card.tsx`, `use-auth.ts`
- Use PascalCase for component files: `EventCard.tsx`, `UserProfile.tsx`
- Use camelCase for utility files: `formatDate.ts`, `validateInput.ts`
- Test files should match their source file: `EventCard.test.tsx`
- Page files should be descriptive: `event-creation.tsx`, `user-dashboard.tsx`

### Directory Structure Rules
- Group related components in feature directories
- Keep shared components in `components/common`
- Place hooks in `hooks` directory with `use` prefix
- Store types in `types` directory with clear naming
- Keep utilities in `lib` with descriptive names

### Import Order
1. React and Next.js imports
2. Third-party library imports
3. Internal components and hooks
4. Type imports
5. Utility functions
6. Style imports

## 2. Component Development

### Component Structure
- Start with type definitions and interfaces
- Follow with component props
- Define hooks and state
- Implement component logic
- Return JSX with clear structure
- Export component as default

### Component Rules
- Use functional components exclusively
- Implement proper TypeScript types
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Maintain clear prop interfaces
- Document complex logic with comments

### State Management
- Use React Context for global state
- Implement hooks for state logic
- Keep state as local as possible
- Document state updates clearly
- Use TypeScript for state types

## 3. Styling Guidelines

### Tailwind CSS Configuration
```typescript
// tailwind.config.ts
const tailwindConfig = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    transform: {
      mdx: (content) => {
        return content.replace(/---(.|\n)*?---/, '')
      }
    }
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          // ... other shades
          900: '#0f172a',
        },
        secondary: {
          // Define secondary colors
        },
        accent: {
          // Define accent colors
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
};
```

#### Class Organization
1. Layout Classes
   ```html
   <div class="
     /* Layout */
     flex flex-col gap-4
     /* Sizing */
     w-full max-w-md
     /* Spacing */
     p-6 my-4
     /* Positioning */
     relative
   ">
   ```

2. Typography Classes
   ```html
   <p class="
     /* Font Family */
     font-sans
     /* Size and Weight */
     text-base font-medium
     /* Color and Decoration */
     text-gray-700 underline-offset-4
     /* Line Height and Spacing */
     leading-relaxed tracking-wide
   ">
   ```

3. Visual Classes
   ```html
   <button class="
     /* Background */
     bg-primary-600 hover:bg-primary-700
     /* Border */
     border border-transparent rounded-lg
     /* Effects */
     shadow-sm hover:shadow-md
     /* Transitions */
     transition-all duration-200
   ">
   ```

#### Responsive Design
```html
<!-- Mobile First Approach -->
<div class="
  /* Base (Mobile) */
  w-full p-4 text-sm
  /* Tablet (md) */
  md:w-2/3 md:p-6 md:text-base
  /* Desktop (lg) */
  lg:w-1/2 lg:p-8 lg:text-lg
">
```

#### Custom Utilities
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      // Custom spacing scale
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      // Custom z-index scale
      zIndex: {
        'behind': '-1',
        'modal': '1000',
        'tooltip': '1100',
      },
    }
  }
};
```

#### Component Variants
```typescript
import { tv } from 'tailwind-variants';

export const button = tv({
  base: "px-4 py-2 rounded-lg transition-colors",
  variants: {
    color: {
      primary: "bg-primary-600 hover:bg-primary-700 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
```

#### Dark Mode Strategy
```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: '#ffffff',
          text: '#1a1a1a',
        },
        // Dark mode colors
        dark: {
          background: '#1a1a1a',
          text: '#ffffff',
        },
      },
    },
  },
};

// Usage in components
<div className="
  bg-light-background dark:bg-dark-background
  text-light-text dark:text-dark-text
">
```

#### Performance Optimization
1. **Content Configuration**
   - Specify exact paths in content array
   - Use appropriate file extensions
   - Implement content transform functions

2. **JIT Mode**
   - Enable Just-in-Time mode by default
   - Use purge in production builds
   - Configure safelist for dynamic classes

3. **CSS Optimization**
   - Minimize unused styles in production
   - Use @layer directives for proper CSS ordering
   - Implement proper cascade layering

#### Best Practices
1. **Class Organization**
   - Group related utilities together
   - Use consistent ordering
   - Implement responsive classes last
   - Keep variants together

2. **Maintainability**
   - Use custom theme values
   - Create reusable components
   - Document custom utilities
   - Maintain consistent naming

3. **Accessibility**
   - Use semantic HTML elements
   - Implement proper color contrast
   - Add focus states
   - Include ARIA attributes

### Component Styling
- Use CSS modules for component-specific styles
- Follow BEM naming for custom classes
- Keep responsive design in mind
- Use Tailwind's configuration
- Maintain accessibility standards

### Theme Configuration
- Use design tokens from Solar template
- Maintain consistent color palette
- Follow spacing scale
- Use typography scale
- Keep animations consistent

## 4. TypeScript Usage

### Type Definitions
- Create clear interface names
- Use type over interface when appropriate
- Export types from dedicated files
- Use generics when needed
- Document complex types

### Type Rules
- No any types unless absolutely necessary
- Use proper type imports/exports
- Implement strict null checks
- Use union types appropriately
- Document type parameters

## 5. API Integration

### API Calls
- Use typed API functions
- Implement proper error handling
- Use loading states
- Handle edge cases
- Document API responses

### Supabase Integration Standards

#### Directory Structure
```
src/
  ├── lib/
  │   └── supabase/
  │       ├── client.ts         # Client configuration
  │       ├── types.ts          # Database types
  │       ├── queries/          # Type-safe queries
  │       │   ├── users.ts
  │       │   └── events.ts
  │       ├── mutations/        # Data mutations
  │       │   ├── create.ts
  │       │   └── update.ts
  │       └── subscriptions/    # Real-time subscriptions
  │           ├── handlers.ts
  │           └── setup.ts
```

#### Type-Safe Query Patterns
```typescript
// types.ts
export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: UserInsert;
        Update: UserUpdate;
      };
      events: {
        Row: Event;
        Insert: EventInsert;
        Update: EventUpdate;
      };
    };
  };
};

// queries/users.ts
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useQuery } from '@tanstack/react-query';

export const userKeys = createQueryKeys('users', {
  detail: (id: string) => [{ id }],
  list: (params: UserQueryParams) => [{ params }]
});

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id).queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new SupabaseError(error);
      }

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15    // 15 minutes
  });
};
```

#### Error Handling Pattern
```typescript
// lib/supabase/errors.ts
export class SupabaseError extends Error {
  constructor(
    public error: PostgrestError | AuthError,
    public context?: Record<string, unknown>
  ) {
    super(error.message);
    this.name = 'SupabaseError';
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.error.code,
      context: this.context
    };
  }
}

// Error handling hook
export const useSupabaseError = () => {
  const handleError = useCallback((error: unknown) => {
    if (error instanceof SupabaseError) {
      // Handle specific error types
      switch (error.error.code) {
        case 'PGRST301':
          // Handle row-level security error
          break;
        case 'AUTH001':
          // Handle authentication error
          break;
        default:
          // Handle generic error
      }
    }
  }, []);

  return { handleError };
};
```

#### React Query Integration
```typescript
// lib/supabase/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,    // 1 minute
      gcTime: 1000 * 60 * 5,   // 5 minutes
      retry: (failureCount, error) => {
        if (error instanceof SupabaseError) {
          // Don't retry auth errors
          if (error.error.code.startsWith('AUTH')) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true
    },
    mutations: {
      retry: false,
      onError: (error) => {
        if (error instanceof SupabaseError) {
          // Global error handling
        }
      }
    }
  }
});
```

#### Real-time Subscription Management
```typescript
// lib/supabase/subscriptions/setup.ts
interface SubscriptionConfig<T> {
  channel: string;
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  filter?: string;
  onData: (payload: T) => void;
  onError: (error: Error) => void;
}

export const useSubscription = <T>({
  channel,
  event,
  filter,
  onData,
  onError
}: SubscriptionConfig<T>) => {
  const retryCount = useRef(0);
  const maxRetries = 5;

  useEffect(() => {
    let subscription: RealtimeSubscription;
    let retryTimeout: NodeJS.Timeout;

    const setupSubscription = async () => {
      try {
        subscription = supabase
          .channel(channel)
          .on(
            'postgres_changes',
            {
              event,
              schema: 'public',
              table: channel,
              filter
            },
            (payload) => onData(payload.new as T)
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              retryCount.current = 0;
            }
          });
      } catch (error) {
        onError(error as Error);
        
        // Implement exponential backoff
        if (retryCount.current < maxRetries) {
          const backoffTime = Math.min(1000 * Math.pow(2, retryCount.current), 30000);
          retryTimeout = setTimeout(setupSubscription, backoffTime);
          retryCount.current++;
        }
      }
    };

    setupSubscription();

    return () => {
      subscription?.unsubscribe();
      clearTimeout(retryTimeout);
    };
  }, [channel, event, filter, onData, onError]);
};

// Usage in component
const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { handleError } = useSupabaseError();

  useSubscription<Event>({
    channel: 'events',
    event: 'INSERT',
    onData: (newEvent) => {
      setEvents(prev => [...prev, newEvent]);
    },
    onError: handleError
  });

  return (
    // Component implementation
  );
};
```

#### Implementation Requirements

1. **Query Standards**
```typescript
const QueryStandards = {
  location: {
    path: 'src/lib/supabase/queries',
    naming: '[entity][Action].ts'
  },
  typing: {
    required: true,
    generics: 'Prefer over any',
    validation: 'Runtime type checking'
  },
  errorHandling: {
    pattern: 'try/catch with SupabaseError',
    context: 'Include operation details',
    recovery: 'Implement retry logic'
  },
  caching: {
    tool: '@tanstack/react-query',
    strategy: 'Stale-while-revalidate',
    invalidation: 'Optimistic updates'
  }
};
```

2. **Real-time Standards**
```typescript
const RealtimeStandards = {
  subscriptions: {
    management: 'Component-level hooks',
    cleanup: 'useEffect cleanup function',
    reconnection: 'Exponential backoff',
    error: 'Standardized error handling'
  },
  performance: {
    batching: 'Group rapid updates',
    debouncing: 'Prevent excessive renders',
    cleanup: 'Clear all intervals/timeouts'
  }
};
```

3. **Testing Requirements**
```typescript
describe('Supabase Integration', () => {
  describe('Queries', () => {
    it('implements proper error handling', async () => {
      const { result } = renderHook(() => useUser('123'));
      
      // Mock error response
      mockSupabase.from.mockImplementationOnce(() => {
        throw new SupabaseError({ code: 'AUTH001' });
      });

      await waitFor(() => {
        expect(result.current.error).toBeInstanceOf(SupabaseError);
      });
    });

    it('handles caching correctly', async () => {
      const { result, rerender } = renderHook(() => useUser('123'));
      
      // First call should fetch
      expect(mockSupabase.from).toHaveBeenCalledTimes(1);
      
      // Rerender within stale time shouldn't fetch
      rerender();
      expect(mockSupabase.from).toHaveBeenCalledTimes(1);
    });
  });

  describe('Real-time', () => {
    it('manages subscriptions properly', () => {
      const { unmount } = renderHook(() => useSubscription({
        channel: 'test',
        event: 'INSERT',
        onData: jest.fn(),
        onError: jest.fn()
      }));

      unmount();
      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('implements reconnection strategy', async () => {
      jest.useFakeTimers();
      
      const { result } = renderHook(() => useSubscription({
        channel: 'test',
        event: 'INSERT',
        onData: jest.fn(),
        onError: jest.fn()
      }));

      // Simulate connection error
      mockSubscription.subscribe.mockRejectedValueOnce(new Error());
      
      // Should attempt reconnection with backoff
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(mockSubscription.subscribe).toHaveBeenCalledTimes(2);
    });
  });
});
```

## 6. Testing Standards

### Template-Specific Testing Patterns

#### Solar Template Testing
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Solar Components', () => {
  describe('Marketing Components', () => {
    it('renders hero section with proper animations', () => {
      render(<MarketingHero />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
      // Test animation classes
      expect(screen.getByRole('banner')).toHaveClass('animate-fade-in');
    });

    it('handles CTA interactions correctly', async () => {
      const onAction = jest.fn();
      render(<CallToAction onAction={onAction} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onAction).toHaveBeenCalled();
    });
  });

  describe('Accessibility Tests', () => {
    it('meets marketing component accessibility standards', () => {
      const { container } = render(<MarketingSection />);
      expect(container).toHaveNoViolations();
    });
  });
});
```

#### Tremor Template Testing
```typescript
import { renderHook } from '@testing-library/react-hooks';
import { screen, waitFor } from '@testing-library/react';

describe('Tremor Components', () => {
  describe('Dashboard Components', () => {
    it('renders metrics with loading states', async () => {
      const { result } = renderHook(() => useMetrics());
      expect(result.current.loading).toBe(true);
      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });
    });

    it('handles data updates correctly', async () => {
      const mockData = [{ value: 100 }];
      render(<MetricsCard data={mockData} />);
      await waitFor(() => {
        expect(screen.getByText('100')).toBeInTheDocument();
      });
    });
  });

  describe('Real-time Updates', () => {
    it('handles subscription updates', async () => {
      const { result } = renderHook(() => useRealtimeData());
      // Test subscription lifecycle
      expect(result.current.connected).toBe(true);
      // Test data updates
      await waitFor(() => {
        expect(result.current.updates).toHaveLength(1);
      });
    });
  });
});
```

### Performance Testing Standards

#### Solar Template Performance
```typescript
describe('Solar Performance', () => {
  it('optimizes image loading', async () => {
    const { container } = render(<HeroSection />);
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('decoding', 'async');
    });
  });

  it('implements proper code splitting', async () => {
    const Component = lazy(() => import('./MarketingSection'));
    render(
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
```

#### Tremor Template Performance
```typescript
describe('Tremor Performance', () => {
  it('implements data virtualization', async () => {
    const largeDataset = Array.from({ length: 1000 });
    render(<DataGrid data={largeDataset} />);
    // Verify only visible rows are rendered
    expect(screen.getAllByRole('row')).toHaveLength(20);
  });

  it('optimizes chart rendering', async () => {
    const { rerender } = render(<MetricsChart data={[]} />);
    const initialRenderTime = performance.now();
    rerender(<MetricsChart data={newData} />);
    const updateTime = performance.now() - initialRenderTime;
    expect(updateTime).toBeLessThan(16); // 60fps threshold
  });
});
```

### Integration Testing

#### API Integration Tests
```typescript
describe('Supabase Integration', () => {
  it('handles query errors gracefully', async () => {
    const { result } = renderHook(() => useSupabaseQuery('table'));
    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(SupabaseError);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('manages real-time subscriptions', async () => {
    const { result, unmount } = renderHook(() => useRealtimeSubscription());
    expect(result.current.subscription).toBeDefined();
    unmount();
    expect(result.current.subscription.closed).toBe(true);
  });
});
```

### Security Testing

```typescript
describe('Security Features', () => {
  it('implements RLS policies', async () => {
    const { result } = renderHook(() => useSecuredData());
    expect(result.current.error).toMatch(/not authorized/i);
  });

  it('protects authenticated routes', async () => {
    const { result } = renderHook(() => useProtectedRoute());
    expect(result.current.redirected).toBe(true);
  });
});
```

### Accessibility Testing

```typescript
describe('A11y Requirements', () => {
  describe('Solar Template', () => {
    it('supports keyboard navigation', async () => {
      render(<MarketingNav />);
      const user = userEvent.setup();
      await user.tab();
      expect(screen.getByRole('link')).toHaveFocus();
    });
  });

  describe('Tremor Template', () => {
    it('implements proper focus management', async () => {
      render(<DashboardControls />);
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation');
    });
  });
});
```

## 7. Performance Guidelines

### Template-Specific Optimization

#### Solar Template Optimization
- Implement proper image loading strategies:
  ```typescript
  const ImageOptimization = {
    loading: 'lazy',
    quality: 75,
    sizes: '(max-width: 768px) 100vw, 50vw',
    placeholder: 'blur',
  };
  ```
- Use proper animation throttling
- Implement intersection observer for animations
- Optimize marketing assets
- Use proper code splitting

#### Tremor Template Optimization
- Implement data virtualization:
  ```typescript
  const VirtualizedList = ({
    data,
    rowHeight,
    visibleRows
  }: VirtualizedProps) => {
    // Implementation
  };
  ```
- Use proper memoization for charts
- Implement proper data chunking
- Use WebWorkers for heavy computations
- Optimize real-time updates

## 8. Documentation Standards

### Code Documentation
- Document complex logic
- Add JSDoc comments
- Document props and types
- Explain non-obvious solutions
- Keep documentation updated

### Component Documentation
- Document component usage
- Add prop documentation
- Include examples
- Document side effects
- Note dependencies

## 9. Git Workflow

### Branch Naming
- feature/: New features
- fix/: Bug fixes
- refactor/: Code improvements
- docs/: Documentation updates
- test/: Test additions

### Commit Messages
- Use conventional commits
- Include ticket references
- Be descriptive but concise
- Separate logical changes
- Document breaking changes

## 10. Error Handling

### Error Standards
- Use proper error boundaries
- Implement typed errors
- Handle async errors
- Log errors appropriately
- Show user-friendly messages

### Error Documentation
- Document error types
- Explain error handling
- Include recovery steps
- Note error boundaries
- Document error logging

## 11. Accessibility Standards

### A11y Rules
- Use semantic HTML
- Implement ARIA labels
- Ensure keyboard navigation
- Maintain color contrast
- Test with screen readers

### A11y Implementation
- Add alt text to images
- Use proper heading hierarchy
- Implement focus management
- Handle reduced motion
- Test accessibility features

## 12. Code Review Guidelines

### Review Process
- Check code style
- Verify TypeScript usage
- Review performance impact
- Check accessibility
- Validate tests

### Review Checklist
- Code follows standards
- Documentation is complete
- Tests are adequate
- Performance is acceptable
- Accessibility is maintained

## 13. Development Environment

### Editor Setup
- Use recommended VS Code extensions
- Maintain consistent formatting
- Enable linting
- Use TypeScript features
- Follow code snippets

### Development Tools
- Use React Developer Tools
- Implement Chrome DevTools
- Use Performance monitoring
- Enable error tracking
- Maintain debugging tools

## 14. Security Guidelines

### Security Rules
- Validate user input
- Implement proper authentication
- Use secure API calls
- Handle sensitive data
- Follow security best practices

### Security Implementation
- Use proper encryption
- Implement rate limiting
- Handle user sessions
- Secure API endpoints
- Monitor security issues

## 15. Directory Management and Command Execution

### Location Validation
- ALWAYS verify current directory before ANY command execution
- Check package.json location before npm/pnpm/yarn commands
- Run commands from the directory containing target package.json
- Validate directory changes with pwd or dir commands
- Never assume directory persistence between commands

### Project Structure Requirements
- Document working directory in all responses
- Use relative paths from validated working directory
- Include directory context in error messages
- Maintain directory state awareness between commands

### Command Location Protocol
For monorepos/subdirectory projects:
- cd into correct directory first
- Verify location after directory change
- Use compound commands with semicolons when needed
- Maintain directory context in background processes

### Directory-Aware Development
- Validate working directory before each operation
- Document directory changes in commit messages
- Maintain consistent directory structure
- Include directory validation in CI/CD steps

### Error Prevention Protocol
Directory-Related:
- Verify working directory before each command
- Check for package.json presence
- Validate node_modules location
- Confirm configuration file paths
- Test commands in correct directory context

Command Execution:
- Use absolute paths when crossing directory boundaries
- Implement directory validation checks
- Document directory requirements
- Handle directory-specific configurations

Path Management:
- Use consistent path separators
- Implement path aliases where appropriate
- Handle cross-platform path issues
- Maintain directory structure documentation

## 16. Component Library Standards

### Component Organization
- Follow strict directory structure:
  ```
  src/
    ├── components/
    │   ├── solar/       # Solar template components
    │   │   ├── marketing/  # Marketing-related components
    │   │   ├── events/     # Event handling components
    │   │   └── auth/       # Authentication components
    │   ├── tremor/      # Tremor dashboard components
    │   │   ├── analytics/  # Analytics and data viz
    │   │   ├── events/     # Event management
    │   │   └── admin/      # Admin interfaces
    │   └── common/      # Shared components
  ```
- Maintain clear separation between Solar and Tremor components
- Keep shared utilities in common directory
- Document component category placement
- Follow consistent naming within each category

### Template-Specific Components

#### Solar Components
- Follow consistent interface structure:
  ```typescript
  interface SolarComponentProps {
    variant?: 'primary' | 'secondary';
    className?: string;
    children: React.ReactNode;
    // Template-specific props
  }

  const SolarComponent: React.FC<SolarComponentProps> = ({
    variant = 'primary',
    className,
    children
  }) => {
    // Solar-specific implementation
  };
  ```
- Use consistent prop naming:
  - `variant` for component variations
  - `className` for style overrides
  - `children` for nested content
- Implement default exports
- Include component display names
- Document Solar-specific features

#### Tremor Components
- Follow dashboard-specific interface structure:
  ```typescript
  // Base interfaces for Tremor components
  interface TremorA11y {
    ariaLabel?: string;
    ariaDescription?: string;
    role?: string;
    tabIndex?: number;
  }

  interface TremorStyling {
    className?: string;
    customStyles?: {
      container?: string;
      header?: string;
      content?: string;
    };
    theme?: 'light' | 'dark';
  }

  type TremorLayout = {
    variant: 'compact' | 'full' | 'minimal';
    gridSpan?: 1 | 2 | 3 | 4;  // For grid layouts
    priority?: 'high' | 'medium' | 'low'; // For responsive behavior
  };

  interface TremorComponentProps<T = any> extends TremorA11y, TremorStyling {
    // Data
    data: T[];
    loading?: boolean;
    error?: Error;
    
    // Layout
    layout?: TremorLayout;
    
    // Events
    onUpdate?: (data: T) => void;
    onError?: (error: Error) => void;
    onDataLoad?: () => void;
    onRefresh?: () => Promise<void>;
    
    // Metadata
    lastUpdated?: Date;
    refreshInterval?: number;
    
    // Configuration
    config?: {
      enableAutoRefresh?: boolean;
      cacheStrategy?: 'memory' | 'local' | 'none';
      errorRetryCount?: number;
    };
  }

  const TremorComponent = <T,>({
    data,
    loading = false,
    error,
    layout = { variant: 'full' },
    onUpdate,
    onError,
    onDataLoad,
    onRefresh,
    lastUpdated,
    refreshInterval = 0,
    config = {
      enableAutoRefresh: false,
      cacheStrategy: 'memory',
      errorRetryCount: 3
    },
    ...a11yAndStylingProps
  }: TremorComponentProps<T>) => {
    // Implementation
  };
  ```

- Component Implementation Requirements:
  1. Must handle loading states with appropriate UI feedback
  2. Must implement error boundaries and error states
  3. Must support data refresh mechanisms
  4. Must include accessibility features
  5. Must support theme customization
  6. Must handle responsive layouts
  7. Must implement proper TypeScript generics
  8. Must include proper event handling
  9. Must support caching strategies
  10. Must handle auto-refresh configurations

- Data Handling Rules:
  1. Implement proper data transformation layers
  2. Handle empty states gracefully
  3. Implement data validation
  4. Support pagination where applicable
  5. Handle real-time updates
  6. Implement proper data caching
  7. Support data export functionality
  8. Handle data type conversions
  9. Implement proper error handling for data fetching
  10. Support data filtering and sorting

- Performance Requirements:
  1. Implement proper memoization
  2. Use virtualization for large datasets
  3. Implement proper loading strategies
  4. Handle data chunking
  5. Optimize render cycles
  6. Implement proper cleanup
  7. Handle memory management
  8. Optimize network requests
  9. Implement proper caching
  10. Handle background updates

### Component Architecture
- Follow Radix UI patterns for primitive components
- Implement consistent prop interfaces
- Use tailwind-variants (tv) for styling variants
- Maintain accessibility through ARIA attributes
- Document component variants and usage

### Shared Components
- Place template-agnostic components in `components/common`
- Implement consistent forwarded refs
- Use TypeScript prop interfaces
- Document component dependencies
- Avoid template-specific logic in common components

### Component Documentation
- Document which template each component belongs to
- Specify component category (marketing/events/auth/etc.)
- List dependencies and requirements
- Include usage examples
- Note any template-specific considerations

### Template Configuration Standards

#### Solar Template Configuration
```typescript
// solar.config.ts
export const SolarConfig = {
  components: {
    location: 'src/components/solar',
    naming: {
      pattern: 'Solar[ComponentName]',
      examples: ['SolarButton', 'SolarCard', 'SolarNavigation']
    },
    variants: {
      usePrefix: true,
      format: 'solar-[variant]',
      validVariants: ['primary', 'secondary', 'accent']
    }
  },
  styling: {
    classPrefix: 'solar-',
    themeTokens: 'src/styles/solar-tokens.ts',
    configFile: 'tailwind.solar.config.ts',
    colorTokens: {
      primary: 'var(--solar-primary)',
      secondary: 'var(--solar-secondary)',
      accent: 'var(--solar-accent)'
    }
  },
  documentation: {
    required: [
      'Component variants',
      'Theme customization',
      'Integration points'
    ],
    template: `
      /**
       * @component Solar[ComponentName]
       * @variants primary | secondary | accent
       * @theming Supports solar-* class prefixes
       * @integration Compatible with SolarProvider
       */
    `
  }
};

// Example implementation
interface SolarComponentConfig<T = unknown> {
  variant: keyof typeof SolarConfig.components.variants.validVariants;
  className?: string;
  theme?: keyof typeof SolarConfig.styling.colorTokens;
  data?: T;
}

const createSolarComponent = <T>(config: SolarComponentConfig<T>) => {
  const prefix = SolarConfig.components.variants.usePrefix ? 'solar-' : '';
  const className = `${prefix}${config.variant}`;
  // Implementation
};
```

#### Tremor Template Configuration
```typescript
// tremor.config.ts
export const TremorConfig = {
  components: {
    location: 'src/components/tremor',
    naming: {
      pattern: 'Tremor[ComponentName]',
      examples: ['TremorMetric', 'TremorChart', 'TremorGrid']
    },
    variants: {
      usePrefix: true,
      format: 'tremor-[variant]',
      validVariants: ['data', 'analytics', 'dashboard']
    }
  },
  styling: {
    classPrefix: 'tremor-',
    themeTokens: 'src/styles/tremor-tokens.ts',
    configFile: 'tailwind.tremor.config.ts',
    gridSystem: {
      columns: 12,
      breakpoints: ['sm', 'md', 'lg', 'xl']
    }
  },
  documentation: {
    required: [
      'Data requirements',
      'Performance considerations',
      'Real-time capabilities'
    ],
    template: `
      /**
       * @component Tremor[ComponentName]
       * @data Requires specific data structure
       * @performance Optimized for large datasets
       * @realtime Supports subscription updates
       */
    `
  }
};
```

### Component Implementation Rules

#### Solar Components
```typescript
// Example Solar component implementation
import { SolarConfig } from '@/config/solar.config';

interface SolarButtonProps extends SolarComponentConfig {
  onClick?: () => void;
  children: React.ReactNode;
}

export const SolarButton: React.FC<SolarButtonProps> = ({
  variant = 'primary',
  theme = 'primary',
  className,
  onClick,
  children
}) => {
  const baseClass = SolarConfig.components.variants.format.replace(
    '[variant]',
    variant
  );
  
  return (
    <button
      className={cx(
        baseClass,
        SolarConfig.styling.colorTokens[theme],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

#### Tremor Components
```typescript
// Example Tremor component implementation
import { TremorConfig } from '@/config/tremor.config';

interface TremorMetricProps<T> extends TremorComponentConfig<T> {
  data: T[];
  refreshInterval?: number;
}

export const TremorMetric = <T,>({
  variant = 'data',
  data,
  refreshInterval,
  className
}: TremorMetricProps<T>) => {
  const baseClass = TremorConfig.components.variants.format.replace(
    '[variant]',
    variant
  );

  return (
    <div className={cx(baseClass, className)}>
      {/* Implementation */}
    </div>
  );
};
```

### Configuration Management

#### File Structure
```
src/
  ├── config/
  │   ├── solar.config.ts    # Solar template configuration
  │   ├── tremor.config.ts   # Tremor template configuration
  │   └── shared.config.ts   # Shared configuration
  ├── styles/
  │   ├── solar-tokens.ts    # Solar design tokens
  │   └── tremor-tokens.ts   # Tremor design tokens
  └── themes/
      ├── solar.theme.ts     # Solar theme definitions
      └── tremor.theme.ts    # Tremor theme definitions
```

#### Configuration Validation
```typescript
// config.validator.ts
export const validateConfig = (config: typeof SolarConfig | typeof TremorConfig) => {
  // Validation implementation
};

// Usage
validateConfig(SolarConfig);
validateConfig(TremorConfig);
```

## 17. Next.js Project Configuration

### App Router Requirements
```typescript
const AppRouterConfig = {
  "appDirectory": {
    "layout": {
      "required": ["layout.tsx", "page.tsx", "loading.tsx", "error.tsx"],
      "location": "src/app",
      "conventions": {
        "loading": "Suspense boundaries",
        "error": "Error boundaries",
        "notFound": "404 handling",
        "metadata": "SEO and OpenGraph"
      }
    },
    "routing": {
      "parallel": {
        "usage": "Use @parallel for concurrent routes",
        "example": "@parallel/analytics/page.tsx"
      },
      "intercepting": {
        "usage": "Use (..) for intercepting routes",
        "example": "(.)preview/page.tsx"
      }
    },
    "dataFetching": {
      "server": {
        "components": "Use React Server Components by default",
        "actions": "Implement Server Actions for mutations",
        "streaming": "Enable streaming for improved UX"
      },
      "client": {
        "components": "Mark with 'use client' when needed",
        "hydration": "Implement proper hydration strategies"
      }
    }
  }
};
```

### State Management Strategy
```typescript
const StateManagementConfig = {
  "server": {
    "tool": "React Server Components",
    "usage": [
      "Data fetching",
      "Heavy computations",
      "Database queries",
      "File operations"
    ],
    "patterns": {
      "streaming": "Stream large datasets",
      "caching": "Implement React cache()",
      "revalidation": "Use revalidatePath/Tag"
    }
  },
  "client": {
    "tool": "React Query + Context",
    "usage": [
      "Interactive UI states",
      "Form state",
      "Optimistic updates",
      "Real-time sync"
    ],
    "patterns": {
      "queries": {
        "staleTime": 1000 * 60 * 5, // 5 minutes
        "gcTime": 1000 * 60 * 15,   // 15 minutes
        "retry": (failureCount, error) => {
          if (error instanceof AuthError) return false;
          return failureCount < 3;
        }
      },
      "mutations": {
        "optimisticUpdates": true,
        "rollbackOnError": true
      }
    }
  },
  "shared": {
    "persistence": {
      "tool": "localStorage/cookies",
      "usage": ["Theme", "Language", "Preferences"]
    },
    "sync": {
      "tool": "Supabase Realtime",
      "usage": ["Live updates", "Presence", "Notifications"]
    }
  }
};
```

## 18. Development Workflow

### Package Management
- Use pnpm exclusively
- Maintain clean lockfile
- Document dependency purposes
- Control package versions
- Handle peer dependencies

### Local Development
- Use consistent Node.js version
- Document setup requirements
- Maintain VS Code settings
- Follow debugging procedures
- Handle environment variables

## 19. Asset Management

### Static Assets
- Store images in `public/images`
- Use Next.js Image component
- Implement proper alt text
- Optimize image formats
- Document asset requirements

### Icons and SVGs
- Use Remix icons consistently
- Implement icon components
- Maintain icon sizing
- Document icon usage
- Control bundle size

This document serves as a living guide for development in Cursor and should be updated as new standards and best practices emerge. All team members should follow these guidelines to maintain consistency and quality across the Medellin AI Platform.

### Tremor Dashboard Integration

#### Metrics Configuration
```typescript
// tremor-metrics.config.ts
export const TremorMetricsConfig = {
  dataFormat: {
    standard: {
      value: number;
      timestamp: string;
      metadata?: Record<string, unknown>;
    },
    realtime: {
      current: number;
      previous: number;
      trend: 'up' | 'down' | 'stable';
      lastUpdated: string;
    }
  },
  updatePatterns: {
    realtime: {
      interval: 1000,
      batchSize: 10,
      throttle: true
    },
    polling: {
      interval: 30000,
      retryAttempts: 3
    }
  }
};

// Example metric implementation
interface TremorMetricProps<T extends keyof typeof TremorMetricsConfig.dataFormat> {
  type: T;
  data: typeof TremorMetricsConfig.dataFormat[T];
  updatePattern: keyof typeof TremorMetricsConfig.updatePatterns;
}

const TremorMetric = <T extends keyof typeof TremorMetricsConfig.dataFormat>({
  type,
  data,
  updatePattern
}: TremorMetricProps<T>) => {
  const updateConfig = TremorMetricsConfig.updatePatterns[updatePattern];
  
  // Implementation with update pattern
};
```

#### Chart Optimization Patterns
```typescript
// tremor-chart.config.ts
export const TremorChartConfig = {
  optimization: {
    memoization: {
      dependencies: ['data', 'dimensions'],
      exclude: ['callbacks', 'styling']
    },
    dataTransforms: {
      useCallback: true,
      memoizeResults: true
    },
    rendering: {
      throttle: true,
      debounceMs: 16 // 60fps
    }
  },
  realtime: {
    subscription: {
      batchUpdates: true,
      bufferSize: 100,
      flushInterval: 1000
    }
  }
};

// Example chart implementation
interface TremorChartProps<T> {
  data: T[];
  dimensions: {
    width: number;
    height: number;
  };
  config?: Partial<typeof TremorChartConfig.optimization>;
}

const TremorChart = <T,>({
  data,
  dimensions,
  config = TremorChartConfig.optimization
}: TremorChartProps<T>) => {
  // Memoized data transformation
  const transformData = useCallback((rawData: T[]) => {
    // Transform implementation
  }, [/* dependencies */]);

  // Memoized chart data
  const chartData = useMemo(() => 
    transformData(data),
    [data, transformData]
  );

  // Subscription setup
  useEffect(() => {
    const subscription = setupRealtimeUpdates({
      ...TremorChartConfig.realtime.subscription,
      onData: (newData) => {
        // Update implementation
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {/* Chart implementation */}
    </div>
  );
};
```

#### Implementation Requirements

1. **Metric Standards**
   ```typescript
   // Standard metric implementation
   const MetricImplementation = {
     required: {
       dataFormat: 'Must follow TremorMetricsConfig.dataFormat',
       updates: 'Must implement specified update pattern',
       types: 'Must use proper TypeScript generics'
     },
     optimization: {
       memoization: 'Memoize expensive calculations',
       updates: 'Batch real-time updates',
       cleanup: 'Proper subscription cleanup'
     }
   };
   ```

2. **Chart Requirements**
   ```typescript
   // Chart implementation checklist
   const ChartImplementation = {
     performance: {
       dataTransforms: 'Must use useCallback',
       memoization: 'Must follow memoCriteria',
       updates: 'Must implement subscription pattern'
     },
     optimization: {
       rendering: 'Must implement throttling',
       memory: 'Must handle cleanup properly',
       batching: 'Must batch real-time updates'
     }
   };
   ```

3. **Real-time Update Patterns**
   ```typescript
   // Subscription pattern
   const useRealtimeUpdates = <T>(config: {
     source: string;
     batchSize: number;
     interval: number;
   }) => {
     const [data, setData] = useState<T[]>([]);
     const buffer = useRef<T[]>([]);

     useEffect(() => {
       const subscription = subscribeToSource(config.source, {
         onData: (newData: T) => {
           buffer.current.push(newData);
           if (buffer.current.length >= config.batchSize) {
             setData(prev => [...prev, ...buffer.current]);
             buffer.current = [];
           }
         }
       });

       const flushInterval = setInterval(() => {
         if (buffer.current.length > 0) {
           setData(prev => [...prev, ...buffer.current]);
           buffer.current = [];
         }
       }, config.interval);

       return () => {
         subscription.unsubscribe();
         clearInterval(flushInterval);
       };
     }, [config.source, config.batchSize, config.interval]);

     return data;
   };
   ```

4. **Performance Optimization**
   ```typescript
   // Performance patterns
   const TremorPerformance = {
     dataTransformation: {
       useCallback: true,
       dependencies: ['data'],
       memoization: {
         criteria: 'data-dependent-only',
         exclude: ['callbacks', 'handlers']
       }
     },
     rendering: {
       throttle: {
         fps: 60,
         method: 'requestAnimationFrame'
       },
       batching: {
         updates: true,
         threshold: 100
       }
     }
   };
   ```

#### Testing Requirements

```typescript
describe('Tremor Dashboard', () => {
  describe('Metrics', () => {
    it('follows standard data format', () => {
      const metric = renderHook(() => useTremorMetric(data));
      expect(metric.result.current).toMatchObject(TremorMetricsConfig.dataFormat.standard);
    });

    it('implements proper update pattern', async () => {
      const { result } = renderHook(() => useRealtimeUpdates(config));
      expect(result.current.updateInterval).toBe(config.interval);
    });
  });

  describe('Charts', () => {
    it('implements proper memoization', () => {
      const { rerender } = render(<TremorChart data={data} />);
      const transforms = jest.spyOn(chartUtils, 'transformData');
      
      rerender(<TremorChart data={data} />);
      expect(transforms).not.toHaveBeenCalled();
      
      rerender(<TremorChart data={newData} />);
      expect(transforms).toHaveBeenCalledTimes(1);
    });

    it('handles real-time updates efficiently', async () => {
      const { result } = renderHook(() => useRealtimeUpdates(config));
      
      // Simulate rapid updates
      await act(async () => {
        for (let i = 0; i < 100; i++) {
          await new Promise(r => setTimeout(r, 10));
          subscription.next(newData);
        }
      });

      // Should have batched updates
      expect(result.current.renderCount).toBeLessThan(20);
    });
  });
});
```

## Development Environment Configuration

### Required Tools and Versions
```typescript
const DevelopmentRequirements = {
  runtime: {
    node: "v20.x",
    pnpm: "latest"
  },
  editor: {
    name: "Visual Studio Code",
    extensions: [
      "tailwindcss.vscode-tailwindcss",
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "bradlc.vscode-tailwindcss",
      "ms-vscode.vscode-typescript-next",
      "cursor.cursor"
    ],
    settings: {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "typescript.tsdk": "node_modules/typescript/lib",
      "typescript.enablePromptUseWorkspaceTsdk": true,
      "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
    }
  }
};

const ProjectConfiguration = {
  packageManager: {
    type: "pnpm",
    strictMode: true,
    workspaces: true,
    hooks: {
      preinstall: "npx only-allow pnpm",
      postinstall: "pnpm run build"
    }
  },
  linting: {
    eslint: {
      extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended"
      ],
      plugins: [
        "@typescript-eslint",
        "tailwindcss"
      ]
    },
    prettier: {
      semi: true,
      singleQuote: true,
      tabWidth: 2
    }
  },
  typescript: {
    strict: true,
    target: "es2022",
    paths: {
      "@/*": ["./src/*"]
    }
  }
};
```

### Development Tools Setup
1. **Editor Configuration**
   - Install required VS Code extensions
   - Apply standardized workspace settings
   - Configure TypeScript integration
   - Set up debugging configurations
   - Enable format on save

2. **Project Initialization**
   - Use pnpm for package management
   - Enable TypeScript strict mode
   - Configure ESLint and Prettier
   - Set up Git hooks with Husky
   - Initialize commit message validation

3. **Environment Variables**
   - Create `.env.local` for development
   - Document required variables
   - Set up validation schema
   - Configure environment switching
   - Manage secrets securely

4. **Development Scripts**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "prepare": "husky install"
  }
}
```

### Quality Assurance Tools
1. **Code Quality**
   - ESLint for code linting
   - Prettier for code formatting
   - TypeScript for type checking
   - Jest for unit testing
   - Cypress for E2E testing

2. **Git Hooks**
   - Pre-commit: lint and format
   - Pre-push: type check and test
   - Commit message validation
   - Branch name validation
   - Automated fixes when possible

3. **CI/CD Integration**
   - GitHub Actions configuration
   - Automated testing setup
   - Build verification
   - Deployment pipelines
   - Environment management

### Performance Monitoring
1. **Development Metrics**
   - Bundle size analysis
   - Lighthouse CI integration
   - Performance budgets
   - Memory leak detection
   - Runtime performance monitoring

2. **Error Tracking**
   - Error boundary setup
   - Logging configuration
   - Performance monitoring
   - User behavior tracking
   - Error reporting

### Security Standards
1. **Development Security**
   - Dependency scanning
   - Code security analysis
   - Secret detection
   - HTTPS enforcement
   - CSP configuration

2. **Authentication Setup**
   - Next-Auth configuration
   - Role-based access control
   - API route protection
   - Session management
   - Token handling

### Documentation Requirements
1. **Code Documentation**
   - JSDoc comments
   - Type definitions
   - Component documentation
   - API documentation
   - Architecture diagrams

2. **Development Guides**
   - Setup instructions
   - Contributing guidelines
   - Style guide
   - Testing guide
   - Deployment guide

This document serves as a living guide for development in Cursor and should be updated as new standards and best practices emerge. All team members should follow these guidelines to maintain consistency and quality across the Medellin AI Platform.

### Tremor Dashboard Integration

#### Metrics Configuration
```typescript
// tremor-metrics.config.ts
export const TremorMetricsConfig = {
  dataFormat: {
    standard: {
      value: number;
      timestamp: string;
      metadata?: Record<string, unknown>;
    },
    realtime: {
      current: number;
      previous: number;
      trend: 'up' | 'down' | 'stable';
      lastUpdated: string;
    }
  },
  updatePatterns: {
    realtime: {
      interval: 1000,
      batchSize: 10,
      throttle: true
    },
    polling: {
      interval: 30000,
      retryAttempts: 3
    }
  }
};

// Example metric implementation
interface TremorMetricProps<T extends keyof typeof TremorMetricsConfig.dataFormat> {
  type: T;
  data: typeof TremorMetricsConfig.dataFormat[T];
  updatePattern: keyof typeof TremorMetricsConfig.updatePatterns;
}

const TremorMetric = <T extends keyof typeof TremorMetricsConfig.dataFormat>({
  type,
  data,
  updatePattern
}: TremorMetricProps<T>) => {
  const updateConfig = TremorMetricsConfig.updatePatterns[updatePattern];
  
  // Implementation with update pattern
};
```

#### Chart Optimization Patterns
```typescript
// tremor-chart.config.ts
export const TremorChartConfig = {
  optimization: {
    memoization: {
      dependencies: ['data', 'dimensions'],
      exclude: ['callbacks', 'styling']
    },
    dataTransforms: {
      useCallback: true,
      memoizeResults: true
    },
    rendering: {
      throttle: true,
      debounceMs: 16 // 60fps
    }
  },
  realtime: {
    subscription: {
      batchUpdates: true,
      bufferSize: 100,
      flushInterval: 1000
    }
  }
};

// Example chart implementation
interface TremorChartProps<T> {
  data: T[];
  dimensions: {
    width: number;
    height: number;
  };
  config?: Partial<typeof TremorChartConfig.optimization>;
}

const TremorChart = <T,>({
  data,
  dimensions,
  config = TremorChartConfig.optimization
}: TremorChartProps<T>) => {
  // Memoized data transformation
  const transformData = useCallback((rawData: T[]) => {
    // Transform implementation
  }, [/* dependencies */]);

  // Memoized chart data
  const chartData = useMemo(() => 
    transformData(data),
    [data, transformData]
  );

  // Subscription setup
  useEffect(() => {
    const subscription = setupRealtimeUpdates({
      ...TremorChartConfig.realtime.subscription,
      onData: (newData) => {
        // Update implementation
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {/* Chart implementation */}
    </div>
  );
};
```

#### Implementation Requirements

1. **Metric Standards**
   ```typescript
   // Standard metric implementation
   const MetricImplementation = {
     required: {
       dataFormat: 'Must follow TremorMetricsConfig.dataFormat',
       updates: 'Must implement specified update pattern',
       types: 'Must use proper TypeScript generics'
     },
     optimization: {
       memoization: 'Memoize expensive calculations',
       updates: 'Batch real-time updates',
       cleanup: 'Proper subscription cleanup'
     }
   };
   ```

2. **Chart Requirements**
   ```typescript
   // Chart implementation checklist
   const ChartImplementation = {
     performance: {
       dataTransforms: 'Must use useCallback',
       memoization: 'Must follow memoCriteria',
       updates: 'Must implement subscription pattern'
     },
     optimization: {
       rendering: 'Must implement throttling',
       memory: 'Must handle cleanup properly',
       batching: 'Must batch real-time updates'
     }
   };
   ```

3. **Real-time Update Patterns**
   ```typescript
   // Subscription pattern
   const useRealtimeUpdates = <T>(config: {
     source: string;
     batchSize: number;
     interval: number;
   }) => {
     const [data, setData] = useState<T[]>([]);
     const buffer = useRef<T[]>([]);

     useEffect(() => {
       const subscription = subscribeToSource(config.source, {
         onData: (newData: T) => {
           buffer.current.push(newData);
           if (buffer.current.length >= config.batchSize) {
             setData(prev => [...prev, ...buffer.current]);
             buffer.current = [];
           }
         }
       });

       const flushInterval = setInterval(() => {
         if (buffer.current.length > 0) {
           setData(prev => [...prev, ...buffer.current]);
           buffer.current = [];
         }
       }, config.interval);

       return () => {
         subscription.unsubscribe();
         clearInterval(flushInterval);
       };
     }, [config.source, config.batchSize, config.interval]);

     return data;
   };
   ```

4. **Performance Optimization**
   ```typescript
   // Performance patterns
   const TremorPerformance = {
     dataTransformation: {
       useCallback: true,
       dependencies: ['data'],
       memoization: {
         criteria: 'data-dependent-only',
         exclude: ['callbacks', 'handlers']
       }
     },
     rendering: {
       throttle: {
         fps: 60,
         method: 'requestAnimationFrame'
       },
       batching: {
         updates: true,
         threshold: 100
       }
     }
   };
   ```

#### Testing Requirements

```typescript
describe('Tremor Dashboard', () => {
  describe('Metrics', () => {
    it('follows standard data format', () => {
      const metric = renderHook(() => useTremorMetric(data));
      expect(metric.result.current).toMatchObject(TremorMetricsConfig.dataFormat.standard);
    });

    it('implements proper update pattern', async () => {
      const { result } = renderHook(() => useRealtimeUpdates(config));
      expect(result.current.updateInterval).toBe(config.interval);
    });
  });

  describe('Charts', () => {
    it('implements proper memoization', () => {
      const { rerender } = render(<TremorChart data={data} />);
      const transforms = jest.spyOn(chartUtils, 'transformData');
      
      rerender(<TremorChart data={data} />);
      expect(transforms).not.toHaveBeenCalled();
      
      rerender(<TremorChart data={newData} />);
      expect(transforms).toHaveBeenCalledTimes(1);
    });

    it('handles real-time updates efficiently', async () => {
      const { result } = renderHook(() => useRealtimeUpdates(config));
      
      // Simulate rapid updates
      await act(async () => {
        for (let i = 0; i < 100; i++) {
          await new Promise(r => setTimeout(r, 10));
          subscription.next(newData);
        }
      });

      // Should have batched updates
      expect(result.current.renderCount).toBeLessThan(20);
    });
  });
});
```

## 20. Error Boundary Standards

### Error Boundary Implementation
```typescript
const ErrorBoundaryConfig = {
  "required": {
    "api": {
      "component": "APIErrorBoundary",
      "usage": "Wrap API-dependent components",
      "features": [
        "Error logging",
        "Retry mechanism",
        "Fallback UI"
      ]
    },
    "router": {
      "component": "RouterErrorBoundary",
      "usage": "Wrap route segments",
      "features": [
        "Navigation error handling",
        "404 handling",
        "Recovery options"
      ]
    },
    "render": {
      "component": "ComponentErrorBoundary",
      "usage": "Wrap complex UI components",
      "features": [
        "Component isolation",
        "State recovery",
        "Graceful degradation"
      ]
    }
  },
  "placement": {
    "feature": "Wrap feature boundaries",
    "route": "Wrap route segments",
    "component": "Wrap complex components"
  },
  "implementation": `
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => {
        this.setState({ hasError: false });
      }} />;
    }

    return this.props.children;
  }
}`
};
```

## 21. Performance Monitoring

### Monitoring Configuration
```typescript
const PerformanceConfig = {
  "required": {
    "webVitals": {
      "metrics": [
        "LCP",
        "FID",
        "CLS",
        "TTFB",
        "FCP"
      ],
      "implementation": `
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    analytics.capture('web-vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating
    });
  }
}`
    },
    "errorTracking": {
      "events": [
        "Unhandled rejections",
        "React errors",
        "API failures",
        "Network errors"
      ],
      "context": {
        "user": "User information",
        "environment": "Environment details",
        "breadcrumbs": "User actions"
      }
    },
    "apiMetrics": {
      "tracking": [
        "Response time",
        "Error rate",
        "Success rate",
        "Cache hit ratio"
      ],
      "implementation": `
const trackAPIMetrics = async (endpoint, startTime) => {
  const duration = performance.now() - startTime;
  analytics.capture('api-metric', {
    endpoint,
    duration,
    timestamp: new Date().toISOString()
  });
};`
    },
    "userFlows": {
      "tracking": [
        "Page transitions",
        "Feature usage",
        "Error encounters",
        "Performance marks"
      ],
      "implementation": `
const trackUserFlow = (flowName, steps) => {
  analytics.capture('user-flow', {
    name: flowName,
    steps,
    duration: performance.now() - flowStart
  });
};`
    }
  },
  "tools": {
    "vercelAnalytics": {
      "setup": "Enable in Vercel dashboard",
      "metrics": [
        "Real user monitoring",
        "Core Web Vitals",
        "Error tracking"
      ]
    },
    "customEvents": {
      "implementation": `
const Analytics = {
  initialize: () => {
    // Setup analytics
  },
  trackEvent: (name, properties) => {
    // Track custom event
  },
  trackError: (error, context) => {
    // Track error with context
  }
};`
    }
  }
};
```

## 22. TypeScript Configuration

### Strict TypeScript Standards
```typescript
const TypeScriptConfig = {
  "compiler": {
    "strict": true,
    "required": {
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitThis": true,
      "useUnknownInCatchVariables": true,
      "exactOptionalPropertyTypes": true
    }
  },
  "types": {
    "utilities": {
      "required": [
        "Partial<T>",
        "Required<T>",
        "Pick<T, K>",
        "Record<K, T>",
        "Exclude<T, U>"
      ],
      "custom": `
type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};`
    },
    "api": {
      "responses": `
interface APIResponse<T> {
  data: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    total?: number;
  };
}`,
      "requests": `
interface PaginatedRequest {
  page?: number;
  limit?: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filter?: Record<string, unknown>;
}`
    }
  },
  "patterns": {
    "generics": {
      "components": `
interface Props<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}`,
      "hooks": `
function useQuery<T>(key: string): {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}`
    },
    "discriminatedUnions": `
type Result<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T };`
  }
};
```

## 23. Testing Strategy

### Modern Testing Approach
```typescript
const TestingConfig = {
  "framework": {
    "unit": {
      "tool": "Vitest",
      "advantages": [
        "Faster than Jest",
        "Better watch mode",
        "Native ESM support",
        "Better error messages"
      ],
      "configuration": `
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      threshold: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90
      }
    }
  }
});`
    },
    "integration": {
      "tool": "React Testing Library",
      "principles": [
        "Test user interactions",
        "Avoid implementation details",
        "Focus on accessibility"
      ],
      "example": `
test('user can submit form', async () => {
  render(<Form />);
  
  await userEvent.type(
    screen.getByLabelText(/email/i),
    'test@example.com'
  );
  
  await userEvent.click(screen.getByRole('button', {
    name: /submit/i
  }));
  
  expect(await screen.findByText(/success/i))
    .toBeInTheDocument();
});`
    },
    "e2e": {
      "tool": "Playwright",
      "features": [
        "Multi-browser support",
        "Mobile emulation",
        "Network interception",
        "Visual testing"
      ],
      "example": `
test('user flow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});`
    }
  },
  "requirements": {
    "api": {
      "tool": "MSW",
      "setup": `
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  http.get('/api/user', () => {
    return HttpResponse.json({ name: 'John' });
  })
);`,
      "usage": "Mock API responses for tests"
    },
    "coverage": {
      "critical": {
        "target": "90%",
        "paths": [
          "src/features/**",
          "src/components/ui/**"
        ]
      },
      "reporting": {
        "ci": true,
        "artifacts": true
      }
    }
  },
  "patterns": {
    "component": {
      "structure": `
describe('Component', () => {
  it('renders successfully', () => {});
  it('handles user interactions', async () => {});
  it('manages state correctly', () => {});
  it('handles errors appropriately', () => {});
});`,
      "fixtures": "Use factory functions",
      "cleanup": "Clear mocks and data"
    },
    "integration": {
      "userFlows": "Test complete features",
      "dataFlow": "Verify state updates",
      "errorStates": "Test error handling"
    }
  }
};
```

## 24. Security Requirements

### Security Standards
```typescript
const SecurityConfig = {
  "csrf": {
    "implementation": {
      "tool": "next-csrf",
      "setup": `
import { csrf } from 'next-csrf';

export const { csrf: csrfMiddleware } = csrf({
  secret: process.env.CSRF_SECRET
});`,
      "usage": "Apply to all mutation routes"
    }
  },
  "rls": {
    "supabase": {
      "policies": {
        "users": `
CREATE POLICY "Users can only read their own data"
ON public.users
FOR SELECT
USING (auth.uid() = id);`,
        "events": `
CREATE POLICY "Public events are readable by everyone"
ON public.events
FOR SELECT
USING (is_public = true OR auth.uid() = creator_id);`
      }
    }
  },
  "validation": {
    "input": {
      "tool": "zod",
      "implementation": `
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

const validateUser = (data: unknown) => {
  return userSchema.parse(data);
};`
    }
  },
  "sanitization": {
    "output": {
      "html": "Use DOMPurify for HTML",
      "sql": "Use parameterized queries",
      "json": "Validate schema before sending"
    }
  },
  "headers": {
    "security": {
      "csp": `
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;`,
      "permissions": `
Permissions-Policy: camera=(), microphone=(), geolocation=()`,
      "referrer": "Referrer-Policy: strict-origin-when-cross-origin"
    }
  }
};
```

## 25. Build Pipeline Requirements

### Build Process Standards
```typescript
const BuildConfig = {
  "required": {
    "typecheck": {
      "preCommit": {
        "command": "pnpm typecheck",
        "implementation": `
module.exports = {
  '*.{ts,tsx}': () => 'pnpm typecheck'
};`
      }
    },
    "linting": {
      "eslint": {
        "config": `
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error'
  }
};`
      }
    },
    "bundleAnalysis": {
      "tool": "@next/bundle-analyzer",
      "config": `
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  // Next.js config
});`,
      "thresholds": {
        "page": "100KB",
        "firstLoad": "200KB",
        "route": "50KB"
      }
    },
    "dependencies": {
      "audit": {
        "command": "pnpm audit",
        "frequency": "daily",
        "autofix": "minor"
      },
      "outdated": {
        "command": "pnpm outdated",
        "frequency": "weekly"
      }
    }
  },
  "ci": {
    "workflow": `
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Type check
        run: pnpm typecheck
      
      - name: Lint
        run: pnpm lint
      
      - name: Test
        run: pnpm test
      
      - name: Build
        run: pnpm build`
  },
  "deployment": {
    "environments": {
      "preview": {
        "url": "{branch}.preview.app.com",
        "vars": ["NEXT_PUBLIC_API_URL"]
      },
      "production": {
        "url": "app.com",
        "protection": ["required_reviews"]
      }
    },
    "monitoring": {
      "uptime": "Vercel Analytics",
      "errors": "Sentry",
      "performance": "Core Web Vitals"
    }
  }
};
```