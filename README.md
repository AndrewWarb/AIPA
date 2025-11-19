# AI PA - Multi-Agent AI Personal Assistant System

A work-in-progress AI Personal Assistant system - an intelligent orchestration multi-agent system designed to act as an intelligence-multiplier for users in the pursuit of their goals.

## Features

### 🤖 Core AI Capabilities
- **AI PA Agent**: The core communicator and orchestrator agent powered by Grok (xAI)
- **Conversation Memory**: Remembers entire chat history for contextual responses
- **AI-Powered Classification**: Uses intelligent query routing instead of keyword matching
- **Goal-Oriented**: Helps users achieve their life goals across multiple domains

### 🏗️ Multi-Agent Architecture
- **Specialist Agents**: Domain-specific AI agents (Health & Wellness, Finance, Legal, etc.)
- **Agent Orchestration**: AI PA coordinates multiple specialists automatically
- **Inter-Agent Communication**: Specialists consult each other and share expertise
- **Visible Agent Conversations**: See specialist consultations in chat with distinct styling

### 🎨 User Interface
- **Web Interface**: Clean, modern chat interface built with Next.js
- **Real-Time Chat**: Instant responses with typing indicators
- **Agent Message Styling**: Different colors for user, AI PA, and specialist messages
- **Responsive Design**: Works on desktop and mobile devices

### 🔧 Technical Features
- **Dual-Model System**: Cheap model for classification, advanced model for responses
- **Cost Optimization**: Intelligent routing minimizes expensive API calls
- **TypeScript**: Full type safety throughout the application
- **Next.js App Router**: Modern React framework with server components

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

## 💬 Usage

### **Getting Started:**
1. **Initialize** the AI PA by clicking the button in the sidebar
2. **Start chatting** - ask about goals, advice, or any topic
3. **Watch for specialist consultations** - the AI PA will automatically consult experts when needed

### **Multi-Agent Conversations:**
When you ask health-related questions, you'll see:
- **🤖 Health & Wellness Agent** messages in green (center-aligned)
- **AI PA** responses that incorporate specialist advice
- **Full conversation transparency** - see how experts are consulted

### **Example Interactions:**

**Health Query:**
```
You: "I want to improve my diet and exercise routine"

🤖 Health & Wellness Agent
"Consulting Health & Wellness Agent about: 'I want to improve my diet...'"

🤖 Health & Wellness Agent
"Based on longevity research, focus on whole foods, strength training 3x/week..."

AI PA: "Based on the Health & Wellness Agent's recommendations, here's your personalized plan..."
```

**Non-Health Query:**
```
You: "What's 1+1?"
AI PA: "2!"
```

### **AI Intelligence Features:**
- **Context Awareness**: Remembers entire conversation history
- **Smart Classification**: Uses AI to understand query intent (not just keywords)
- **Automatic Specialist Routing**: Health questions trigger Health & Wellness Agent
- **Cost Optimization**: Cheap model for routing, advanced model for responses

## Architecture

### 🤖 AI Models & Intelligence
- **Primary LLM**: `grok-4-1-fast-reasoning` - Advanced reasoning for responses and specialist consultations
- **Classification Engine**: `grok-3-mini` - Cost-effective AI-powered query routing
- **Intelligent Routing**: Automatic specialist agent selection based on query analysis

### 🏗️ Multi-Agent System
#### **Implemented Agents:**
- **AI PA Orchestrator**: Main communication hub and specialist coordinator
- **Health & Wellness Agent**: Expert in nutrition, fitness, mental health, and longevity

#### **Current MVP Components:**
- **Dual-Model AI System**: Smart classification + quality responses
- **Agent Orchestration**: AI PA calls specialists automatically when needed
- **Inter-Agent Communication**: Specialists provide expert consultations
- **Visible Agent Dialogues**: See specialist conversations in chat UI
- **Conversation Memory**: Full chat history for contextual responses

#### **Web Interface:**
- **Real-Time Chat**: Messaging interface with loading indicators
- **Multi-Modal Display**: Different styling for user, AI PA, and specialist agent messages
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

#### **Directory Structure:**
- `information/` - Stored information and documents
- `drafts/` - Draft documents and emails
- `presentation/` - Charts and presentation materials
- `raw/` - Raw user uploads
- `plans/` - Generated plans from agents
- `LookupTable.txt` - Index of all stored documents

### 🚀 Future Development (per PLAN.md):
- **Additional Specialist Agents**: Finance, Legal, Relationships, Goal Achiever
- **Infrastructure Agents**: Scheduling, Clerk, Viability Checker, Summarizer, Planner
- **Advanced Features**: Document processing, plan generation, viability checking

## Technology Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI/ML**: LangChain, xAI Grok Models, Multi-Agent Architecture
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
│   │   ├── chat/          # Chat API endpoint with agent orchestration
│   │   └── initialize/    # AI PA initialization endpoint
│   ├── layout.tsx         # Root layout with hydration fixes
│   └── page.tsx           # Main chat interface with multi-agent display
├── lib/
│   ├── agents/
│   │   ├── ai-pa.ts       # AI PA orchestrator with conversation memory
│   │   └── health-wellness-agent.ts  # Health & wellness specialist
│   └── ai-pa-service.ts   # Singleton service for AI PA instance
```

## 🛠️ Technology Stack

### **AI & Machine Learning:**
- **LangChain**: Framework for building multi-agent LLM infrastructure
- **xAI Grok Models**:
  - `grok-4-1-fast-reasoning`: Advanced reasoning for responses & consultations
  - `grok-3-mini`: Cost-effective classification and routing
- **Multi-Agent Architecture**: Intelligent agent orchestration and communication

### **Frontend:**
- **Next.js 15**: React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: State management and effects

### **Backend:**
- **Next.js API Routes**: Server-side API endpoints
- **Node.js**: Runtime environment
- **Environment Variables**: Secure API key management

### **Development Tools:**
- **ESLint**: Code quality and consistency
- **TypeScript**: Primary language used

## Development

### **✅ Recently Implemented:**
- **Multi-Agent Architecture**: AI PA orchestrator with Health & Wellness specialist
- **AI-Powered Classification**: Intelligent query routing using dual-model system
- **Conversation Memory**: Full chat history for contextual responses
- **Agent Communication**: Visible inter-agent consultations with distinct UI styling
- **Cost Optimization**: Smart model selection (cheap for routing, advanced for responses)

### **🚧 Active Development:**
- **Additional Specialist Agents**: Finance, Legal, Relationships, Goal Achiever agents
- **Infrastructure Agents**: Clerk (file management), Viability Checker, Summarizer, Planner
- **Document Processing**: File upload, parsing, and information extraction
- **Plan Generation**: AI-generated action plans with viability checking
- **User Goal Tracking**: Progress monitoring and milestone celebrations

### **🎯 Long-term Vision:**
- **Complete PLAN.md Implementation**: Full multi-agent orchestration system
- **Advanced UI Features**: Charts, progress tracking, document previews
- **Integration APIs**: Calendar, email, task management systems

