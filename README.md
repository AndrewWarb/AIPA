# AI PA - Personal Assistant MVP

A minimal viable product of the AI Personal Assistant system - an intelligent orchestration multi-agent system designed to act as an intelligence-multiplier for users in the pursuit of their goals.

## Features

- **AI PA Agent**: The core communicator and orchestrator agent powered by Grok (xAI)
- **Goal-Oriented**: Helps users achieve their life goals across multiple domains
- **Web Interface**: Clean, modern chat interface built with Next.js
- **CrewAI Integration**: Uses CrewAI for agent orchestration
- **Directory Structure**: Organized file system for agent-accessible information

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your xAI API key:**
   - Get your API key from [x.ai](https://x.ai/api)
   - Create a `.env.local` file in the root directory:
     ```bash
     cp env-example.txt .env.local
     ```
   - Edit `.env.local` and replace `your_xai_api_key_here` with your actual xAI API key:
     ```
     XAI_API_KEY=your_actual_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

5. **Initialize AI PA:**
   - Click "Initialize AI PA" in the sidebar
   - Start chatting!

## Architecture

### Current MVP Components:
- **AI PA Agent**: The main orchestrator agent that communicates with users
- **Web Interface**: Chat-based UI for user interaction
- **Directory Structure**:
  - `information/` - Stored information and documents
  - `drafts/` - Draft documents and emails
  - `presentation/` - Charts and presentation materials
  - `raw/` - Raw user uploads
  - `plans/` - Generated plans from agents
  - `LookupTable.txt` - Index of all stored documents

### Future Agents (as per PLAN.md):
- Scheduling Agent
- Clerk Agent
- Viability Checker
- Summarizer
- Planner
- Specialist Agents (Health, Finance, Legal, Relationships, Goal Achiever)

## Technology Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI/ML**: LangChain, CrewAI, Grok (xAI)
- **Language**: TypeScript

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/          # Chat API endpoint
│   │   └── initialize/    # AI PA initialization
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat interface
├── lib/
│   ├── agents/
│   │   └── ai-pa.ts       # AI PA agent implementation
│   └── ai-pa-service.ts   # Service for managing AI PA instance
```

## Contributing

This is a minimal MVP implementation. Future enhancements include:
- Adding all planned specialist agents
- Implementing the full agent orchestration system
- Enhanced file management and lookup capabilities
- User goal tracking and progress monitoring
