// AI Service - Communication with AI model

const API_KEY = process.env.REACT_APP_AI_API_KEY;
const API_URL = process.env.REACT_APP_AI_API_URL;
const MAX_HISTORY_LENGTH = parseInt(process.env.REACT_APP_MAX_HISTORY_LENGTH || '20');

// System prompt - Define AI behavior and knowledge scope
const SYSTEM_PROMPT = `
You are a professional immigration consultant for New Zealand and Australia named ImmiGo. You have comprehensive knowledge about immigration policies, visa types, application processes, and eligibility requirements for New Zealand and Australia.

Your responsibilities include:
1. Accurately answering questions about New Zealand and Australia immigration policies
2. Explaining different types of visas and their requirements
3. Providing guidance on visa application processes
4. Assessing immigration eligibility based on user-provided information
5. Recommending suitable immigration pathways for users' situations

Please note:
- Provide accurate and up-to-date information
- Clearly state that you are not a legal advisor and cannot provide legal advice
- Proactively ask questions when unsure or need more information
- Use simple and easy-to-understand language
- Respond to user questions in English
`;

/**
 * Send messages to AI model and get response
 * @param {Array} messages Message history
 * @returns {Promise<string>} AI response
 */
export const getAIResponse = async (messages) => {
  // If API key is not configured, return error message
  if (!API_KEY) {
    console.error('API key not configured. Please set REACT_APP_AI_API_KEY in the .env file');
    return 'System configuration error. Please contact administrator to set up AI API key.';
  }

  try {
    // Limit message history length to prevent exceeding context window
    const limitedMessages = messages.length > MAX_HISTORY_LENGTH 
      ? messages.slice(messages.length - MAX_HISTORY_LENGTH) 
      : messages;
    
    // Prepare messages for API
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...limitedMessages
    ];

    console.log('Number of messages sent to AI API:', apiMessages.length);
    
    // Call OpenAI API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Failed to get AI response:', error);
    
    // If API error occurs, return mock response as backup option
    if (error.message.includes('API error')) {
      console.log('Using backup mock data');
      return await mockApiCall(messages);
    }
    
    throw error;
  }
};

/**
 * Mock API call - Used for development, testing, or as backup when API fails
 * @param {Array} messages Message history
 * @returns {Promise<string>} Mock AI response
 */
const mockApiCall = async (messages) => {
  // Kept as backup option
  return new Promise((resolve) => {
    setTimeout(() => {
      const userMessage = messages[messages.length - 1].content;
      
      // Some preset responses
      let response;
      if (userMessage.toLowerCase().includes('visa')) {
        response = 'New Zealand and Australia offer various visa types including work visas, student visas, and permanent resident visas. Which specific visa would you like to learn more about?';
      } else if (userMessage.toLowerCase().includes('point') || userMessage.toLowerCase().includes('score')) {
        response = 'The skilled migration points system considers multiple factors including age, educational background, work experience, and language ability. The point requirements vary by visa category, typically New Zealand skilled migration requires 160+ points, while Australian skilled migration requires 65-75+ points to be invited to apply.';
      } else if (userMessage.toLowerCase().includes('cost') || userMessage.toLowerCase().includes('fee')) {
        response = 'Immigration costs include application fees, medical examination fees, translation fees, etc. The main applicant fee for Australian skilled migration is approximately 4000 AUD, and New Zealand skilled migration is about 3000 NZD. Consider also agent fees (if used) and initial settlement costs.';
      } else {
        response = `Thank you for your inquiry. As ImmiGo immigration consultant, I can provide professional guidance on New Zealand and Australia immigration policies. Which specific aspects of "${userMessage}" would you like to learn more about? (Note: This is a backup mode response, API connection failed)`;
      }
      
      resolve(response);
    }, 1000);
  });
};

export default {
  getAIResponse
}; 