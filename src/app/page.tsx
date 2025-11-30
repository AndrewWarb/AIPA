'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'agent';
  content: string;
  timestamp: Date;
  agentName?: string;
  agentQuery?: string;
}

interface AgentConsultation {
  agent: string;
  query: string;
  response: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Reference to invisible element at bottom of messages for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check AI PA initialization status on component mount
  useEffect(() => {
    const checkInitializationStatus = async () => {
      try {
        const response = await fetch('/api/initialize');
        if (response.ok) {
          const data = await response.json();
          setIsInitialized(data.initialized);
        }
      } catch (error) {
        console.error('Failed to check initialization status:', error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    void checkInitializationStatus(); // Explicitly ignore the promise
  }, []);


  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addAgentConsultation = (agentName: string, query: string, response: string) => {
    // Add agent query message
    const queryMessage: Message = {
      id: `agent-query-${Date.now()}`,
      role: 'agent',
      content: `Consulting ${agentName} about: "${query}"`,
      timestamp: new Date(),
      agentName,
      agentQuery: query,
    };

    // Add agent response message
    const responseMessage: Message = {
      id: `agent-response-${Date.now()}`,
      role: 'agent',
      content: response,
      timestamp: new Date(),
      agentName,
    };

    setMessages(prev => [...prev, queryMessage, responseMessage]);
  };

  const sendMessage = async () => {
    if (!input.trim() || !isInitialized) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add agent consultations to chat if any
        if (data.agentConsultations && data.agentConsultations.length > 0) {
          data.agentConsultations.forEach((consultation: AgentConsultation) => {
            addAgentConsultation(consultation.agent, consultation.query, consultation.response);
          });
        }

        // Add AI PA response
        addMessage('assistant', data.response);
      } else {
        const errorData = await response.json();
        addMessage('assistant', `Sorry, I encountered an error: ${errorData.error || 'Failed to get response'}. Please try again.`);
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('assistant', 'Sorry, I encountered an error processing your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI PA</h1>
          <p className="text-sm text-gray-600 mt-1">Personal Assistant</p>
        </div>

        {isCheckingStatus ? (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-yellow-900 mb-2">Initializing AI PA</h3>
              <p className="text-xs text-yellow-700">Checking server status and loading models...</p>
            </div>
          </div>
        ) : isInitialized ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm text-green-800">✓ AI PA Active</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">Capabilities</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Goal-oriented advice</li>
                <li>• Cognitive load balancing</li>
                <li>• Personalized recommendations</li>
                <li>• Multi-domain expertise</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-red-900 mb-2">AI PA Unavailable</h3>
              <p className="text-xs text-red-700 mb-3">
                Please check your <code className="bg-red-100 px-1 py-0.5 rounded text-xs">XAI_API_KEY</code> in <code className="bg-red-100 px-1 py-0.5 rounded text-xs">.env.local</code>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {isCheckingStatus
              ? 'Starting AI PA'
              : isInitialized
              ? 'Chat with AI PA'
              : 'AI PA Unavailable'
            }
          </h2>
          <p className="text-sm text-gray-600">
            {isCheckingStatus
              ? 'Initializing your personal assistant...'
              : isInitialized
              ? 'Your intelligent personal assistant for achieving life goals'
              : 'Please check your XAI_API_KEY configuration'
            }
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && isInitialized && !isCheckingStatus && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-lg mb-2">👋 Hello! I&apos;m your AI Personal Assistant</p>
              <p>Start by telling me about your goals or asking for advice on any topic.</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user'
                  ? 'justify-end'
                  : message.role === 'agent'
                    ? 'justify-center'
                    : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.role === 'agent'
                      ? 'bg-green-50 border border-green-200 text-green-900'
                      : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                {message.role === 'agent' && message.agentName && (
                  <p className="text-xs font-semibold text-green-700 mb-1">
                    🤖 {message.agentName}
                  </p>
                )}
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user'
                    ? 'text-blue-100'
                    : message.role === 'agent'
                      ? 'text-green-600'
                      : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">AI PA is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef}/>
        </div>

        {/* Input Area */}
        {isInitialized && !isCheckingStatus && (
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask AI PA anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
