# Medellin AI Platform - Homepage Documentation

## Overview
The homepage serves as the primary entry point for the Medellin AI Platform, showcasing upcoming events, community highlights, and key features using the Solar template with Tremor component integrations.

reference docs for home page 
1. for events section - please reference docs\Project\pages\2-home-events.md


## 1. Hero Section
```typescript
{
  "component": "Hero",
  "styling": {
    "background": {
      "type": "gradient",
      "colors": [
        "#f0562e", // Solar primary orange
        "#f97316"  // Tailwind orange-500
      ]
    },
    "container": {
      "className": "relative isolate px-6 pt-14 lg:px-8",
      "height": "min-h-[80vh]"
    },
    "wrapper": {
      "className": "mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"
    }
  },
  "content": {
    "headline": {
      "text": "The Future of AI in Medellín",
      "className": "text-4xl font-bold tracking-tight text-white sm:text-6xl",
      "textAlign": "text-center"
    },
    "subheadline": {
      "text": "Join the community shaping the future of artificial intelligence",
      "className": "mt-6 text-lg leading-8 text-white/80",
      "textAlign": "text-center"
    },
    "cta": {
      "wrapper": {
        "className": "mt-10 flex items-center justify-center gap-x-6"
      },
      "primary": {
        "text": "Discover Events",
        "className": "rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-solar-orange shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        "href": "/events"
      },
      "secondary": {
        "text": "Join Community",
        "className": "text-sm font-semibold leading-6 text-white hover:text-white/80",
        "href": "/register",
        "icon": {
          "name": "ArrowRight",
          "className": "ml-2 h-4 w-4"
        }
      }
    },
    "background": {
      "blur": {
        "className": "absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80",
        "styles": {
          "background": "linear-gradient(to right, #f0562e, #f97316)"
        }
      }
    }
  }
}
```

## 2. Featured Events Section
reference for events section - please reference docs\Project\pages\2-home-events.md


## 3. Features Section
decide which solar templates section  we can use 
```typescript
{
  "component": "Features",
  "styling": {
    "container": "max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8",
    "grid": "grid grid-cols-1 gap-12 lg:grid-cols-3"
  },
  "features": [
    {
      "title": "AI Event Discovery",
      "description": "Find and join AI events that match your interests",
      "icon": "Sparkles",
      "color": "solar-orange"
    },
    {
      "title": "Expert Network",
      "description": "Connect with AI professionals and enthusiasts",
      "icon": "UserGroup",
      "color": "blue-500"
    },
    {
      "title": "Learning Resources",
      "description": "Access curated AI learning materials and guides",
      "icon": "AcademicCap",
      "color": "emerald-500"
    }
  ]
}
```




## 4. Call to Action Section


use existing solar template CTA use dark section 
which currently has the following text which needs to be changed
Farm Management
Monitoring & Control for Precision Agriculture
Complete oversight of your farming operations across fields, irrigation systems, and aerial monitoring, delivering insights even in remote rural locations.

text needs to changed to 
content for home page cta section
About Medellin AI
We are a community-driven initiative dedicated to fostering AI innovation and knowledge sharing in Medellín. Our events bring together professionals, enthusiasts, and industry leaders to explore the latest in artificial intelligence.


cards section 
section
remove
Solar Analytics
Turn field data into profitable harvests with real-time insights

keep the 4 cards
Autonomous Navigation
Smart tractors that navigate fields independently using GPS.

change text of 4 cards to
The Future of AI in Medellín
Join a thriving community shaping AI’s future through exclusive events, workshops, and networking.

Comprehensive Event Management
A powerful platform that simplifies organizing AI events, ticketing, and sponsorship management.

Knowledge Sharing & Networking
Connect with AI professionals, industry leaders, and enthusiasts to exchange ideas and insights.

Innovation at Every Event
Explore cutting-edge AI trends through engaging conferences, hackathons, and expert panels.

## 5. Footer Section
use existing solar template footer

 footer
use existing - solar template footer
use the following text

Footer Text 
1. Column 1
medellin AI Logo - use existing logo
Medellin AI
Empowering Medellín's AI community through knowledge sharing, networking, and innovative events.

contact@medellinai.com

Medellín, Colombia

social icons at bottom
linkedin 
facebook 
whatsapp


2. second column
Quick Links
About Us
Upcoming Events
Become a Speaker
Community Guidelines
FAQ
Privacy Policy
Terms of Service

3. Column 3 

Stay Connected
button
join our community
link to whatsapp 




## Implementation Notes

``` 