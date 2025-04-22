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
  
  // 获取配置的最大历史记录长度
  const MAX_HISTORY_LENGTH = parseInt(process.env.REACT_APP_MAX_HISTORY_LENGTH || '20');

  // 自动滚动到最新消息
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // 欢迎消息
  useEffect(() => {
    const welcomeMessage = {
      role: 'assistant',
      content: '你好！我是ImmiGo，您的新西兰和澳洲移民AI顾问。我可以回答有关移民政策、签证申请、资格要求等问题。请告诉我您想了解什么？'
    };
    setChatHistory([welcomeMessage]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    await sendMessage(userInput);
  };

  const sendMessage = async (message) => {
    // 添加用户消息到聊天历史
    const userMessage = { role: 'user', content: message };
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    
    // 清空输入框
    setUserInput('');
    
    // 显示加载状态
    setIsLoading(true);
    
    try {
      // 限制发送给API的消息历史长度
      const limitedHistory = newHistory.length > MAX_HISTORY_LENGTH 
        ? newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH) 
        : newHistory;
      
      // 调用AI服务获取回复
      const aiMessageContent = await getAIResponse(
        limitedHistory.map(msg => ({ role: msg.role, content: msg.content }))
      );
      
      // 添加AI回复到聊天历史
      const aiMessage = { role: 'assistant', content: aiMessageContent };
      setChatHistory(prevHistory => [...prevHistory, aiMessage]);
      
      // 如果历史记录过长，可以在UI中只保留最近的部分记录
      if (chatHistory.length > MAX_HISTORY_LENGTH * 2) {
        setChatHistory(currentHistory => 
          currentHistory.slice(currentHistory.length - MAX_HISTORY_LENGTH * 2)
        );
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory(prevHistory => [
        ...prevHistory, 
        { role: 'assistant', content: '抱歉，处理您的请求时出现了错误。请稍后再试。' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理知识库中选择的主题
  const handleTopicSelect = (question) => {
    setUserInput(question);
  };

  // 处理评估表单打开
  const handleOpenEligibilityForm = () => {
    setShowEligibilityForm(true);
  };

  // 处理评估表单关闭
  const handleCloseEligibilityForm = () => {
    setShowEligibilityForm(false);
  };

  // 处理评估表单提交
  const handleSubmitEligibilityForm = (formattedQuestion) => {
    sendMessage(formattedQuestion);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ImmiGo</h1>
        <p>您的新西兰和澳洲移民AI顾问</p>
      </header>
      
      <main className="chat-container">
        <div className="controls">
          <button 
            className="eligibility-button" 
            onClick={handleOpenEligibilityForm}
          >
            进行移民资格评估
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
          {isLoading && <div className="loading">AI顾问正在思考...</div>}
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <input 
            type="text" 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="请输入您的移民相关问题..."
            className="input-field"
            disabled={isLoading}
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            发送
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
