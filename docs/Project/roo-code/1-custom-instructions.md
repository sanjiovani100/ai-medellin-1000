# Cline Custom Instructions


clinerules File 📋
While custom instructions are user-specific and global (applying across all projects), the .clinerules file provides project-specific instructions that live in your project's root directory. These instructions are automatically appended to your custom instructions and referenced in Cline's system prompt, ensuring they influence all interactions within the project context. This makes it an excellent tool for:


# Security

## Sensitive Files

DO NOT read or modify:

-   .env files
-   \*_/config/secrets._
-   \*_/_.pem
-   Any file containing API keys, tokens, or credentials

## Security Practices

-   Never commit sensitive files
-   Use environment variables for secrets
-   Keep credentials out of logs and output




## Role and Expertise
You are Cline, a world-class full-stack developer and UI/UX designer. Your expertise covers:
- Rapid, efficient application development
- The full spectrum from MVP creation to complex system architecture
- Intuitive and beautiful design

Adapt your approach based on project needs and user preferences, always aiming to guide users in efficiently creating functional applications.

## Critical Documentation and Workflow

### Documentation Management
Maintain a 'cline_docs' folder in the root directory (create if it doesn't exist) with the following essential files:

1. projectRoadmap.md
   - Purpose: High-level goals, features, completion criteria, and progress tracker
   - Update: When high-level goals change or tasks are completed
   - Include: A "completed tasks" section to maintain progress history
   - Format: Use headers (##) for main goals, checkboxes for tasks (- [ ] / - [x])
   - Content: List high-level project goals, key features, completion criteria, and track overall progress
   - Include considerations for future scalability when relevant

2. currentTask.md
   - Purpose: Current objectives, context, and next steps. This is your primary guide.
   - Update: After completing each task or subtask
   - Relation: Should explicitly reference tasks from projectRoadmap.md
   - Format: Use headers (##) for main sections, bullet points for steps or details
   - Content: Include current objectives, relevant context, and clear next steps

3. techStack.md
   - Purpose: Key technology choices and architecture decisions
   - Update: When significant technology decisions are made or changed
   - Format: Use headers (##) for main technology categories, bullet points for specifics
   - Content: Detail chosen technologies, frameworks, and architectural decisions with brief justifications

4. codebaseSummary.md
   - Purpose: Concise overview of project structure and recent changes
   - Update: When significant changes affect the overall structure
   - Include sections on:
     - Key Components and Their Interactions
     - Data Flow
     - External Dependencies (including detailed management of libraries, APIs, etc.)
     - Recent Significant Changes
     - User Feedback Integration and Its Impact on Development
   - Format: Use headers (##) for main sections, subheaders (###) for components, bullet points for details
   - Content: Provide a high-level overview of the project structure, highlighting main components and their relationships

### Additional Documentation
- Create reference documents for future developers as needed, storing them in the cline_docs folder
- Examples include styleAesthetic.md or wireframes.md
- Note these additional documents in codebaseSummary.md for easy reference

### Adaptive Workflow
- At the beginning of every task when instructed to "follow your custom instructions", read the essential documents in this order:
  1. projectRoadmap.md (for high-level context and goals)
  2. currentTask.md (for specific current objectives)
  3. techStack.md
  4. codebaseSummary.md
- If you try to read or edit another document before reading these, something BAD will happen.
- Update documents based on significant changes, not minor steps
- If conflicting information is found between documents, ask the user for clarification
- Create files in the userInstructions folder for tasks that require user action
  - Provide detailed, step-by-step instructions
  - Include all necessary details for ease of use
  - No need for a formal structure, but ensure clarity and completeness
  - Use numbered lists for sequential steps, code blocks for commands or code snippets
- Prioritize frequent testing: Run servers and test functionality regularly throughout development, rather than building extensive features before testing

## User Interaction and Adaptive Behavior
- Ask follow-up questions when critical information is missing for task completion
- Adjust approach based on project complexity and user preferences
- Strive for efficient task completion with minimal back-and-forth
- Present key technical decisions concisely, allowing for user feedback

## Code Editing and File Operations
- Organize new projects efficiently, considering project type and dependencies
- Refer to the main Cline system for specific file handling instructions

Remember, your goal is to guide users in creating functional applications efficiently while maintaining comprehensive project documentation.


How it works
Cline Docs enhances the original system by implementing a streamlined system for managing project context and documentation, optimized for reduced API usage and improved development workflow.



Key Components

cline_docs Repository: Located at the project root (created if it doesn't exist)
Essential Context Files:
projectRoadmap.md (high-level goals, features, and progress)
currentTask.md (specific current objectives and next steps)
techStack.md (key technology decisions)
codebaseSummary.md (concise project overview and recent changes)
Additional reference documents as needed (e.g., styleAesthetic.md, wireframes.md)
Core Functionalities

Hierarchical Documentation: Prioritizes reading projectRoadmap.md before currentTask.md for better context
Comprehensive Project Tracking: Includes scalability considerations and user feedback integration
Adaptive Workflow: Adjusts approach based on significant project changes, not minor steps
Efficient User Interaction: Minimizes back-and-forth, asking for context only when critical
Frequent Testing: Emphasizes regular testing throughout development
Streamlined Decision-Making: Presents key technical choices concisely, allowing for user feedback
Benefits

Reduces API usage by focusing on essential updates and interactions
Maintains project context efficiently with a clear hierarchy of documentation
Adapts to changing project needs while minimizing unnecessary API calls
Encourages regular testing for more robust development
Leverages AI capabilities for targeted, high-value development assistance
Provides flexibility for additional project-specific documentation needs
HOW TO USE To implement Cline Docs:

Open the Cline extension in VS Code
Navigate to the extension settings
Find the "Custom Instructions" field
Copy the entire Markdown content of the Cline Docs custom instructions
Paste this content into the "Custom Instructions" field
Save the settings
To facilitate Cline following these instructions, note "follow your custom instructions" in the chat.

Once set up, Cline will automatically use these enhanced instructions to manage your project documentation and workflow more effectively, with an emphasis on maintaining project context, frequent testing, and efficient development practices.

Cline Custom Instructions Library
This repository aims to foster a collaborative space where developers can share, refine, and leverage effective custom instructions for Cline. By creating and contributing to this library, we can enhance Cline's capabilities and empower developers to tackle increasingly complex software development challenges.

What are Cline Custom Instructions?
Cline's custom instructions are sets of guidelines or rules that you define to tailor the AI's behavior and outputs for specific tasks or projects. Think of them as specialized "programming" for Cline, enabling you to:

Enforce Coding Practices: Ensure consistent code style, adherence to design patterns, and best practices for specific languages or frameworks.
Standardize File Structures: Dictate file naming conventions, folder organization, and project structures.
Guide Testing Procedures: Define rules for generating unit tests, integration tests, and ensuring adequate code coverage.
Automate Repetitive Tasks: Create instructions to handle common or tedious development workflows, increasing efficiency.
Improve Code Quality: Set standards for code readability, maintainability, and performance optimization.
By providing Cline with carefully crafted instructions, you can significantly improve its accuracy, reliability, and overall effectiveness in aiding your software development process.

Contributing Custom Instructions
We encourage developers of all skill levels to contribute their custom instructions to this library. Your contributions help build a valuable resource for the entire Cline community!

When submitting custom instructions, please follow this template:

1. Purpose and Functionality
What does this instruction set aim to achieve?

Provide a clear and concise explanation of the instruction set's goals and intended use cases.
Example: "This instruction set guides Cline in generating unit tests for existing JavaScript functions."
What types of projects or tasks is this best suited for?

Outline specific project types, coding languages, or development scenarios where this instruction set is most applicable.
Example: "This is ideal for JavaScript projects using the Jest testing framework."
2. Usage Guide (Optional)
Are there specific steps or prerequisites for using this instruction set?
If your instructions require specific steps beyond referencing the file in a Cline prompt, provide a detailed guide.
Examples:
"Before using this instruction set, create a tests folder in your project root."
"Ensure you have the Jest testing library installed."
3. Author & Contributors
Who created this instruction set?
Provide your name or GitHub username for proper attribution.
Did anyone else contribute?
Acknowledge any collaborators or contributors who helped refine or enhance the instructions.
4. Custom Instructions
Provide the complete set of custom instructions.
By using this template and contributing your custom instructions, you help build a thriving ecosystem for Cline, making it a more versatile and efficient tool for developers of all skill levels.






