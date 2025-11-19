# System Plan for AI PA:

## Executive Summary

The AI PA system will be a concurrent orchestration multi-agent system using LangChain and CrewAI, which will, via a Next.js web interface, ingest a user's context and their detailed life goals, keeping them up to date continuously from conversations, and a team of specialized AI agents will collaborate together to aid the user in their acomplishment of those goals. The agents will look at all of the information the user has given them and their goals, and act like a team of individual experts across many domains including health, finance, relationships, productivity and law, to provide the user with deeply personalized advice on questions in their life, all in the context of achieving their life goals. It will use Grok as the LLM via xAI's API.

The high-level goal of AI PA system is to act like an intelligence-multiplier for the user in the pursuit of their goals, and as a cognitive load-balancer to free up head-space to allow the user to focus more deeply on their tasks.

## Core:

### Agents:
    User-Facing:
        AI PA (Communicator and Orchestrator):
            Top-level agent which communicates directly with the user, and calls the other agents dynamically when required.
    Technical:
        Scheduling Agent:
            Report on and modify the user's schedule.
        Clerk:
            Ensures that all information and documents are organized logically, and manages the lookup table.
        Viability Checker:
            Conducts second checks on proposed plans to ensure their premises are accurate, and the outcomes are likely.
        Summarizer:
            Summarizes large documents and other information collections into extremely concise summaries.
    Core:
        Planner:
            The core planning agent with access to all summaries, information, and documents. Calls specialist and technical agents when required.
    
    Specialists:
        Goal Achiever:
            Ensure that the user's actions will result in advancement toward their goals.
        Health & Wellness Agent:
            Maximize the user's longevity.
        Finance Agent:
            Maximize the user's net worth.
        Legal Agent:
            Ensure all the user's actions are legal and fully compliant with all regulations.
        Relationships Agent:
            Ensures the user's relationships are maintained and enhanced to maximize their probability of achieving their goals.

### Agent-Accessible Directory Structure:
    📝 LookupTable.txt
        Single text document listing all stored documents and information sources and their locations in the directory.
    📁 information
        Folder containing all stored information
    📁 drafts
        Folder for draft documents, emails, etc.
    📁 presentation
        Folder for storing anything created primarily for the purpose of being presented to the user, such as charts
    📁 raw
        Folder containing raw uploads from the user, before any processing.
    📁 plans
        Folder containing fully written out plans, created by the Planner agent.

### Example Agent-Flow:
    User: "Which of these 3 options from Aldi should I buy for dinner? [image1, image2, image3]"
    AI PA:
        Calls Planner asking for a plan of which of the given options the user should buy
    Planner:
        Determines which specialist Agents' domains are touched by this query:
            Health & Wellness
            Finance
            Goal Achiever
        Starts formulating own answer, reading relevant documents on the user's health, finances and goals.
        Concurrently, calls each of the aforementioned specialist agents with customized queries, tailoring them to their doimain, eg. "From the perspective of the user's health and longevity, which of these three options from Aldi would be the most optimal for them to eat for dinner? The shepherds pie, the ..."
        Once its own plan is formulated, and all specialist agents have returned answers, it reads each answer, and modifies its own plan as and where required, and/or asks the relevant specialist agents for further clarification if needed, iteratively modifying its own plan, taking into account the input from all the specialists.
        Calls Viability Checker agent to second-check its plan to ensure it is fully grounded in reality and the user's context.
        Once complete, it writes up its full plan into a plan document in the plans folder.
        Any time files are added or moved, the Clerk agent gets automatically called and blocks the calling agent while it verifies logical placement of the file.
        On Clerk confirmation, reports back to the AI PA agent with a summary of the plan, and the location of the plan file.
    AI PA:
        Reads the plan file, explain a summary of the plan to the user, and then presents the whole plan document to the user.