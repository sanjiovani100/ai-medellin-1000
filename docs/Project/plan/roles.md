# Role Generation Prompt for Medellin AI Platform

## Context
You are tasked with generating comprehensive role definitions for the Medellin AI Platform, a sophisticated event management and community platform built with Next.js, Solar Template, Tremor Dashboard, and Supabase.

## Input Requirements
For each role, provide:
1. Role title and category
2. Core responsibilities
3. Required skills and expertise
4. Key performance indicators (KPIs)
5. Integration points with other roles
6. Technical requirements and tools

## Role Categories to Define

### Technical Roles
1. Development (Code Expert)
2. Architecture
3. Design
4. Testing
5. Security
6. Performance
7. Internationalization
8. DevOps Specialist

### Event Management Roles
1. Event Management
2. Event Planning
3. Event Marketing
4. Event Ticketing
5. Sponsor Lead Generation
6. Analytics
7. Payment Systems

## Output Format

```typescript
// Role Categories
type RoleCategory = "Technical" | "Event Management";

// Technical Role Types
type TechnicalRoleType = 
  | "Development"
  | "Architecture"
  | "Design"
  | "Testing"
  | "Security"
  | "Performance"
  | "Internationalization"
  | "DevOps";

// Event Management Role Types
type EventManagementRoleType =
  | "EventManagement"
  | "EventPlanning"
  | "EventMarketing"
  | "EventTicketing"
  | "SponsorManagement"
  | "Analytics"
  | "PaymentSystems";

// System Integration Types
interface SystemIntegration {
  name: string;
  type: "CI/CD" | "Monitoring" | "Analytics" | "Security" | "Communication" | "Payment" | "CRM";
  access: "read" | "write" | "admin";
}

// Expertise Level Type
type ExpertiseLevel = "required" | "preferred";

// KPI Definition
interface KPI {
  metric: string;
  target: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
}

// Tool Definition
interface Tool {
  name: string;
  category: "Development" | "Testing" | "Monitoring" | "Communication" | "Analytics";
  proficiencyLevel: "Basic" | "Intermediate" | "Advanced";
}

// Role Integration
interface RoleIntegration {
  role: string;
  type: "reports_to" | "collaborates_with" | "manages";
  responsibilities: string[];
}

// Enhanced Role Definition
interface RoleDefinition {
  title: string;
  category: RoleCategory;
  type: TechnicalRoleType | EventManagementRoleType;
  responsibilities: string[];
  expertise: {
    [key in ExpertiseLevel]: string[];
  };
  kpis: KPI[];
  tools: Tool[];
  integrations: {
    roles: RoleIntegration[];
    systems: SystemIntegration[];
  };
  reporting: {
    reportsTo: string;
    manages: string[];
  };
  workflowAccess: {
    canCreate: boolean;
    canApprove: boolean;
    canDelete: boolean;
    restrictions: string[];
  };
}

// Role Implementation Example
const developmentLead: RoleDefinition = {
  title: "Development Lead",
  category: "Technical",
  type: "Development",
  responsibilities: [
    "Lead full-stack development using Next.js and TypeScript",
    "Implement Solar Template and Tremor Dashboard components",
    "Manage Supabase database and real-time features"
  ],
  expertise: {
    required: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Solar Template",
      "Tremor Dashboard"
    ],
    preferred: [
      "WebSocket",
      "Redis",
      "PostgreSQL"
    ]
  },
  kpis: [
    {
      metric: "Code quality",
      target: ">90% test coverage",
      frequency: "weekly"
    },
    {
      metric: "Sprint completion rate",
      target: ">85%",
      frequency: "monthly"
    }
  ],
  tools: [
    {
      name: "VS Code",
      category: "Development",
      proficiencyLevel: "Advanced"
    },
    {
      name: "Git",
      category: "Development",
      proficiencyLevel: "Advanced"
    }
  ],
  integrations: {
    roles: [
      {
        role: "System Architect",
        type: "reports_to",
        responsibilities: ["Architecture alignment", "Technical decisions"]
      },
      {
        role: "DevOps",
        type: "collaborates_with",
        responsibilities: ["Deployment", "CI/CD"]
      }
    ],
    systems: [
      {
        name: "GitHub Actions",
        type: "CI/CD",
        access: "admin"
      },
      {
        name: "Supabase",
        type: "Analytics",
        access: "admin"
      }
    ]
  },
  reporting: {
    reportsTo: "CTO",
    manages: ["Frontend Developers", "Backend Developers"]
  },
  workflowAccess: {
    canCreate: true,
    canApprove: true,
    canDelete: true,
    restrictions: ["Production Database Access"]
  }
};
```

## Required Sections

### 1. Role Overview
- Clear title and category
- Brief description
- Position within organization
- Reporting structure

### 2. Core Responsibilities
- Primary duties
- Key deliverables
- Regular tasks
- Strategic objectives

### 3. Technical Requirements
- Required technologies
- Development tools
- Platforms and frameworks
- Infrastructure knowledge

### 4. Integration Points
- Team collaboration
- System interactions
- External services
- Communication channels

### 5. Performance Metrics
- Success criteria
- Quality metrics
- Productivity measures
- Impact assessment

## Style Guidelines
1. Use clear, professional language
2. Be specific about technical requirements
3. Include measurable outcomes
4. Define clear boundaries between roles
5. Highlight collaboration points

## Special Requirements
1. Align with Solar and Tremor templates
2. Consider Supabase integration
3. Focus on scalability
4. Include security considerations
5. Address performance requirements

## Example Format
```json
{
  "title": "Development Lead",
  "category": "Technical",
  "responsibilities": [
    "Lead technical implementation",
    "Code review and quality assurance",
    "Architecture decisions",
    "Team mentoring"
  ],
  "expertise": {
    "required": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Solar Template",
      "Tremor Dashboard"
    ],
    "preferred": [
      "GraphQL",
      "WebSocket",
      "Redis"
    ]
  },
  "kpis": [
    "Code quality metrics",
    "Sprint completion rate",
    "System performance",
    "Team velocity"
  ],
  "tools": [
    "VS Code",
    "Git",
    "GitHub Actions",
    "Docker"
  ],
  "integrations": {
    "roles": [
      "DevOps",
      "Security",
      "Testing"
    ],
    "systems": [
      "CI/CD pipeline",
      "Monitoring tools",
      "Analytics platform"
    ]
  }
}
```

## Validation Criteria
The generated roles should:
1. Be technically accurate and implementable
2. Follow best practices for each domain
3. Address all core requirements
4. Include clear collaboration guidelines
5. Consider scalability and maintenance

## Additional Considerations
1. Remote work capabilities
2. Documentation requirements
3. Training and mentoring
4. Cross-functional collaboration
5. Career progression path

## Role Definitions

### Technical Roles

#### 1. Development Lead (Code Expert)
```json
{
  "title": "Development Lead",
  "category": "Technical",
  "responsibilities": [
    "Lead full-stack development using Next.js and TypeScript",
    "Implement Solar Template and Tremor Dashboard components",
    "Manage Supabase database and real-time features",
    "Establish coding standards and best practices",
    "Conduct code reviews and technical mentoring",
    "Optimize application performance and scalability"
  ],
  "expertise": {
    "required": [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Solar Template",
      "Tremor Dashboard",
      "React",
      "TailwindCSS"
    ],
    "preferred": [
      "WebSocket",
      "Redis",
      "PostgreSQL",
      "GraphQL"
    ]
  },
  "kpis": [
    "Code quality metrics (>90% test coverage)",
    "Sprint completion rate (>85%)",
    "System performance metrics",
    "Feature delivery timeline adherence",
    "Technical debt reduction"
  ],
  "tools": [
    "VS Code",
    "Git",
    "GitHub Actions",
    "Docker",
    "Jest",
    "Cypress",
    "Vercel"
  ],
  "integrations": {
    "roles": [
      "Architecture",
      "DevOps",
      "Security",
      "Testing"
    ],
    "systems": [
      "CI/CD pipeline",
      "Monitoring tools",
      "Analytics platform",
      "Supabase"
    ]
  }
}

#### 2. System Architect
```json
{
  "title": "System Architect",
  "category": "Technical",
  "responsibilities": [
    "Design overall system architecture",
    "Define technical standards and patterns",
    "Plan scalability and performance strategies",
    "Make critical technology decisions",
    "Design database schema and data flow",
    "Ensure system security and compliance"
  ],
  "expertise": {
    "required": [
      "System Architecture",
      "Next.js",
      "Supabase",
      "Cloud Infrastructure",
      "Security Patterns",
      "Performance Optimization"
    ],
    "preferred": [
      "Microservices",
      "Event-driven Architecture",
      "Serverless Computing",
      "Multi-tenant Systems"
    ]
  },
  "kpis": [
    "System uptime (>99.9%)",
    "Response time (<200ms)",
    "Architecture compliance rate",
    "Technical debt metrics",
    "System scalability benchmarks"
  ],
  "tools": [
    "Architecture Modeling Tools",
    "Performance Monitoring",
    "Cloud Platforms",
    "Security Analysis Tools"
  ],
  "integrations": {
    "roles": [
      "Development",
      "Security",
      "DevOps",
      "Performance"
    ],
    "systems": [
      "Cloud Infrastructure",
      "Monitoring Systems",
      "Security Tools",
      "Database Systems"
    ]
  }
}

### Event Management Roles

#### 1. Event Operations Manager
```json
{
  "title": "Event Operations Manager",
  "category": "Event Management",
  "responsibilities": [
    "Oversee end-to-end event management",
    "Coordinate with technical teams for platform features",
    "Manage event lifecycle and workflows",
    "Ensure event success metrics",
    "Handle stakeholder communications",
    "Optimize event processes"
  ],
  "expertise": {
    "required": [
      "Event Management",
      "Project Management",
      "Stakeholder Management",
      "Platform Operations",
      "Analytics"
    ],
    "preferred": [
      "Technical Background",
      "Marketing Experience",
      "Financial Management",
      "Risk Management"
    ]
  },
  "kpis": [
    "Event success rate",
    "Attendee satisfaction (>90%)",
    "Platform utilization metrics",
    "Response time to issues",
    "Budget adherence"
  ],
  "tools": [
    "Event Management Platform",
    "Project Management Tools",
    "Analytics Dashboard",
    "Communication Tools",
    "Tremor Dashboard"
  ],
  "integrations": {
    "roles": [
      "Marketing",
      "Technical Team",
      "Support",
      "Sales"
    ],
    "systems": [
      "Event Platform",
      "CRM",
      "Analytics",
      "Communication Tools"
    ]
  }
}

#### 2. Marketing & Sponsorship Lead
```json
{
  "title": "Marketing & Sponsorship Lead",
  "category": "Event Management",
  "responsibilities": [
    "Develop marketing strategies for events",
    "Manage sponsor relationships",
    "Create promotional campaigns",
    "Track marketing metrics",
    "Optimize sponsor ROI",
    "Handle sponsor communications"
  ],
  "expertise": {
    "required": [
      "Digital Marketing",
      "Sponsorship Management",
      "Content Strategy",
      "Analytics",
      "CRM Management"
    ],
    "preferred": [
      "Event Industry Experience",
      "Technical Marketing",
      "Partnership Development",
      "Data Analysis"
    ]
  },
  "kpis": [
    "Sponsor satisfaction rate",
    "Marketing campaign ROI",
    "Lead generation metrics",
    "Engagement rates",
    "Revenue growth"
  ],
  "tools": [
    "Marketing Automation",
    "CRM System",
    "Analytics Tools",
    "Social Media Management",
    "Email Marketing Platform"
  ],
  "integrations": {
    "roles": [
      "Event Operations",
      "Sales",
      "Content Team",
      "Technical Team"
    ],
    "systems": [
      "Marketing Platform",
      "CRM",
      "Analytics",
      "Communication Tools"
    ]
  }
}

## Implementation Guidelines

1. Each role should maintain clear boundaries while ensuring effective collaboration
2. Regular cross-functional meetings should be established
3. KPIs should be reviewed and updated quarterly
4. Training and development plans should be created for each role
5. Documentation should be maintained for all processes and procedures

## Career Development

1. Clear progression paths within each role category
2. Cross-training opportunities between technical and event management roles
3. Skill development programs aligned with role requirements
4. Regular performance reviews and feedback sessions
5. Mentorship programs for knowledge sharing 