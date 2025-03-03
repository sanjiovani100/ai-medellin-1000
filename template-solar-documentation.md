# Tremor Solar Template Documentation

## Overview

The Solar template is a professionally designed website template from Tremor, built with modern web technologies. It's focused on agricultural technology, specifically smart farming and solar-powered automation solutions.

## Technology Stack

- **Next.js 15.1.6** - React framework for server-rendered applications
- **React 19.0.0** - JavaScript library for building user interfaces
- **TailwindCSS 4.0.0-beta.3** - Utility-first CSS framework
- **Motion 12.0.1** - Animation library
- **Geist** - Font package
- **Radix UI** - Unstyled, accessible UI components

## Project Structure

```
template-solar/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   └── siteConfig.ts # Site configuration
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # UI-specific components
│   │   │   ├── Map/     # Map visualization
│   │   │   └── ...      # Other UI components
│   │   └── ...          # Generic components
│   └── lib/             # Utility functions
└── ...                  # Configuration files
```

## Key Components

### 1. Hero Section
A visually striking introduction with animated background, headline "Autonomy for every Farm", and a call-to-action button.

### 2. Features Section
Showcases the key features and benefits of the solar automation platform.

### 3. Testimonial Section
Customer testimonials and social proof.

### 4. Map Visualization
Geographic representation of service coverage or user distribution.

### 5. Analytics Section
Displays data visualizations related to solar performance or agricultural metrics.

### 6. Call to Action
Final conversion section encouraging visitors to take action.

## Customization

The template can be customized by:

1. Modifying the `siteConfig.ts` file to update site-wide settings
2. Editing component content in the respective component files
3. Adjusting styling via Tailwind classes or in the globals.css file
4. Adding new pages in the app directory following Next.js conventions

## Running the Project

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm run dev
```

3. Access the site at http://localhost:3000

## Building for Production

```bash
pnpm run build
pnpm start
```

## License

This site template is a commercial product licensed under the [Tremor License](https://blocks.tremor.so/license).