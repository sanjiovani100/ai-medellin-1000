# Tremor Components Setup Guide

## Project Completion Status
🟢 **Completed**: 60% (Next.js environment, Tailwind CSS, @tailwindcss/forms plugin, @remixicon/react, Tailwind config, Layout updates, Tremor dependencies, PostCSS config, Tremor utility files)
🟡 **In Progress**: 0%
🔴 **Remaining**: 40% (Tremor component implementation)

## Overview

[Tremor](https://www.tremor.so/) is a React library that provides a comprehensive suite of data visualization and dashboard components designed to work seamlessly with Tailwind CSS. This guide outlines the steps to integrate Tremor components into our Medellin AI project.

## Installation Steps for Next.js

Tremor is designed for React and requires React v18.2.0+.

### 1. Install Tremor 🟢

```
npm install @tremor/react --legacy-peer-deps
```

Note: Installed with `--legacy-peer-deps` flag due to React version compatibility (project uses React 19, while Tremor requires React 18).

### 2. Install Required Dependencies 🟢

```
npm install @headlessui/react --legacy-peer-deps
```

Note: @remixicon/react is already installed (version 4.6.0) in the project.

### 3. Install Tailwind CSS Forms Plugin 🟢

This dependency is already installed in the project (version 0.5.10).

Note: The plugin still needs to be configured in the postcss.config.mjs file.

### 4. Update Tailwind Configuration 🟢

Update your `tailwind.config.ts` file to include Tremor's styles:

```typescript
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import formsPlugin from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Path to Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [formsPlugin],
};

export default config;
```

### 5. Update Layout for Dark Mode and Font Smoothing 🟢

In your `app/layout.tsx` file, add the dark mode background and font smoothing:

```tsx
<html lang="en" className="antialiased dark:bg-slate-950">
  <body>{children}</body>
</html>
```

Current layout.tsx does not have these classes yet:
```tsx
<html lang="en">
  <body>{children}</body>
</html>
```

### Phase 1: Setup and Installation 🟢
- 🟢 Set up Next.js environment with Tailwind CSS (COMPLETED)
- 🟢 Install Tremor and required dependencies (COMPLETED)
  - 🟢 @remixicon/react is installed
  - 🟢 @tailwindcss/forms is installed
  - 🟢 @tremor/react is installed
  - 🟢 @headlessui/react is installed
- 🟢 Configure Tailwind for Tremor
  - 🟢 Create tailwind.config.ts with Tremor configuration
  - 🟢 Update postcss.config.mjs to use the forms plugin
- 🟢 Create utility files for Tremor
  - 🟢 src/lib/tremor/theme.ts - Theme configuration with color palettes and formatters
  - 🟢 src/lib/tremor/utils.ts - Utility functions and hooks for charts and data
  - 🟢 src/lib/tremor/index.ts - Export file for Tremor utilities
  - 🔴 Update postcss.config.mjs to use the forms plugin
- 🔴 Create utility files for Tremor

### Phase 2: Component Integration 🔴
- 🔴 Create basic dashboard layout
- 🔴 Implement event analytics components
- 🔴 Build data visualization for event metrics
- 🔴 Develop interactive charts for attendance tracking

### Phase 3: Testing and Optimization 🔴
- 🔴 Test components across different screen sizes
- 🔴 Optimize performance for data-heavy dashboards
- 🔴 Ensure accessibility compliance
- 🔴 Document component usage for team reference

## Available UI Components

Tremor provides a comprehensive set of UI components:

- **Accordion**: [https://npm.tremor.so/docs/ui/accordion](https://npm.tremor.so/docs/ui/accordion)
- **Badge**: [https://tremor.so/docs/ui/badge](https://tremor.so/docs/ui/badge)
- **Button**: [https://npm.tremor.so/docs/ui/button](https://npm.tremor.so/docs/ui/button)
- **Callout**: [https://tremor.so/docs/ui/callout](https://tremor.so/docs/ui/callout)
- **Card**: [https://tremor.so/docs/ui/card](https://tremor.so/docs/ui/card)
- **Date (Range) Picker**: [https://tremor.so/docs/ui/date-range-picker](https://tremor.so/docs/ui/date-range-picker)
- **Dialog**: [https://tremor.so/docs/ui/dialog](https://tremor.so/docs/ui/dialog)
- **Divider**: [https://tremor.so/docs/ui/divider](https://tremor.so/docs/ui/divider)
- **Icons**: [https://tremor.so/docs/ui/icons](https://tremor.so/docs/ui/icons)
- **Legend**: [https://tremor.so/docs/ui/legend](https://tremor.so/docs/ui/legend)
- **List**: [https://tremor.so/docs/ui/list](https://tremor.so/docs/ui/list)
- **Number Input**: [https://tremor.so/docs/ui/number-input](https://tremor.so/docs/ui/number-input)
- **Select**: [https://tremor.so/docs/ui/select](https://tremor.so/docs/ui/select)
- **Switch**: [https://tremor.so/docs/ui/switch](https://tremor.so/docs/ui/switch)
- **Table**: [https://tremor.so/docs/ui/table](https://tremor.so/docs/ui/table)
- **Tabs**: [https://tremor.so/docs/ui/tabs](https://tremor.so/docs/ui/tabs)
- **Text Input**: [https://tremor.so/docs/ui/text-input](https://tremor.so/docs/ui/text-input)
- **Textarea**: [https://tremor.so/docs/ui/textarea](https://tremor.so/docs/ui/textarea)

## Basic Usage Example 🔴

Here's a simple example of using Tremor components:

```tsx
import { Card, Text, Metric } from "@tremor/react";

export default function SimpleMetric() {
  return (
    <Card className="max-w-xs mx-auto">
      <Text>Total Registered Attendees</Text>
      <Metric>1,234</Metric>
    </Card>
  );
}
```

## Further Resources

- [Tremor Official Documentation](https://www.tremor.so/docs/getting-started/installation)
- [Tremor Blocks](https://www.tremor.so/blocks) - Copy and paste production-ready blocks
- [Tremor Figma UI Kit](https://www.figma.com/community/file/1203061493325953101) - Design components in Figma
- [Remix Icon](https://remixicon.com/) - Icon set used by Tremor