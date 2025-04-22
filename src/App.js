import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getAIResponse } from './services/aiService';
import KnowledgeBase from './components/KnowledgeBase';
import EligibilityForm from './components/EligibilityForm';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);
  const chatHistoryRef = useRef(null);
  
  // Get configured maximum history length
  const MAX_HISTORY_LENGTH = parseInt(process.env.REACT_APP_MAX_HISTORY_LENGTH || '20');

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Welcome message
  useEffect(() => {
    const welcomeMessage = {
      role: 'assistant',
      content: 'Hello! I am ImmiGo, your New Zealand and Australia immigration AI consultant. I can answer questions about immigration policies, visa applications, eligibility requirements, and more. Please tell me what you would like to know?'
    };
    setChatHistory([welcomeMessage]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    await sendMessage(userInput);
  };

  const sendMessage = async (message) => {
    // Add user message to chat history
    const userMessage = { role: 'user', content: message };
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    
    // Clear input field
    setUserInput('');
    
    // Show loading status
    setIsLoading(true);
    
    try {
      // Limit message history length sent to API
      const limitedHistory = newHistory.length > MAX_HISTORY_LENGTH 
        ? newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH) 
        : newHistory;
      
      // Call AI service to get response
      const aiMessageContent = await getAIResponse(
        limitedHistory.map(msg => ({ role: msg.role, content: msg.content }))
      );
      
      // Add AI response to chat history
      const aiMessage = { role: 'assistant', content: aiMessageContent };
      setChatHistory(prevHistory => [...prevHistory, aiMessage]);
      
      // If history is too long, only keep recent records in UI
      if (chatHistory.length > MAX_HISTORY_LENGTH * 2) {
        setChatHistory(currentHistory => 
          currentHistory.slice(currentHistory.length - MAX_HISTORY_LENGTH * 2)
        );
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory(prevHistory => [
        ...prevHistory, 
        { role: 'assistant', content: 'Sorry, an error occurred while processing your request. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle topic selection from knowledge base
  const handleTopicSelect = (question) => {
    setUserInput(question);
  };

  // Handle opening eligibility form
  const handleOpenEligibilityForm = () => {
    setShowEligibilityForm(true);
  };

  // Handle closing eligibility form
  const handleCloseEligibilityForm = () => {
    setShowEligibilityForm(false);
  };

  // Handle eligibility form submission
  const handleSubmitEligibilityForm = (formattedQuestion) => {
    sendMessage(formattedQuestion);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ImmiGo</h1>
        <p>Your New Zealand and Australia Immigration AI Consultant</p>
      </header>
      
      <main className="chat-container">
        <div className="controls">
          <button 
            className="eligibility-button" 
            onClick={handleOpenEligibilityForm}
          >
            Take Immigration Eligibility Assessment
          </button>
        </div>
        
        <div className="chat-history" ref={chatHistoryRef}>
          {chatHistory.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && <div className="loading">AI consultant is thinking...</div>}
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your immigration question..."
            className="input-field"
            disabled={isLoading}
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            Send
          </button>
        </form>
        
        <KnowledgeBase onSelectTopic={handleTopicSelect} />
        
        {showEligibilityForm && (
          <EligibilityForm 
            onSubmitForm={handleSubmitEligibilityForm} 
            onClose={handleCloseEligibilityForm} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
