// AI服务 - 处理与AI模型的通信

const API_KEY = process.env.REACT_APP_AI_API_KEY;
const API_URL = process.env.REACT_APP_AI_API_URL;
const MAX_HISTORY_LENGTH = parseInt(process.env.REACT_APP_MAX_HISTORY_LENGTH || '20');

// 系统提示词 - 定义AI的行为和知识范围
const SYSTEM_PROMPT = `
你是一位专业的新西兰和澳洲移民顾问，名为ImmiGo。你拥有关于新西兰和澳洲移民政策、签证类型、申请流程和资格要求的全面知识。

你的职责包括：
1. 准确回答关于新西兰和澳洲移民政策的问题
2. 解释不同类型的签证及其要求
3. 提供签证申请流程的指导
4. 基于用户提供的信息评估移民资格
5. 推荐适合用户情况的移民途径

请注意：
- 提供准确、最新的信息
- 明确说明你不是法律顾问，无法提供法律建议
- 当不确定或需要更多信息时，主动提问
- 使用简单、易懂的语言
- 使用中文回答用户问题
`;

/**
 * 向AI模型发送消息并获取回复
 * @param {Array} messages 消息历史记录
 * @returns {Promise<string>} AI回复
 */
export const getAIResponse = async (messages) => {
  // 如果还没有配置API密钥，返回错误信息
  if (!API_KEY) {
    console.error('API密钥未配置。请在.env文件中设置REACT_APP_AI_API_KEY');
    return '系统配置错误。请联系管理员设置AI API密钥。';
  }

  try {
    // 限制消息历史长度，防止超出上下文窗口
    const limitedMessages = messages.length > MAX_HISTORY_LENGTH 
      ? messages.slice(messages.length - MAX_HISTORY_LENGTH) 
      : messages;
    
    // 准备发送给API的消息
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...limitedMessages
    ];

    console.log('发送到AI API的消息数量:', apiMessages.length);
    
    // 调用OpenAI API
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
      throw new Error(`API错误: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('获取AI回复失败:', error);
    
    // 如果发生API错误，返回模拟回复作为备份选项
    if (error.message.includes('API错误')) {
      console.log('使用备份模拟数据');
      return await mockApiCall(messages);
    }
    
    throw error;
  }
};

/**
 * 模拟API调用 - 仅用于开发和测试，或API故障时的备份
 * @param {Array} messages 消息历史记录
 * @returns {Promise<string>} 模拟的AI回复
 */
const mockApiCall = async (messages) => {
  // 作为备份选项保留
  return new Promise((resolve) => {
    setTimeout(() => {
      const userMessage = messages[messages.length - 1].content;
      
      // 一些预设的回复
      let response;
      if (userMessage.includes('签证') || userMessage.includes('visa')) {
        response = '新西兰和澳洲提供多种签证类型，包括工作签证、学生签证、永久居民签证等。需要了解哪种具体签证的信息？';
      } else if (userMessage.includes('打分') || userMessage.includes('point') || userMessage.includes('分数')) {
        response = '技术移民评分系统考虑多个因素，包括年龄、教育背景、工作经验、语言能力等。不同签证类别的分数要求不同，通常新西兰技术移民需要160分以上，而澳洲技术移民需要65-75分以上才有可能被邀请申请。';
      } else if (userMessage.includes('费用') || userMessage.includes('花费') || userMessage.includes('cost')) {
        response = '移民费用包括申请费、体检费、翻译费等。澳洲技术移民主申请费约4000澳元，新西兰技术移民约3000纽币。此外还需考虑中介费用(如使用)和定居初期生活费用。';
      } else {
        response = `感谢您的咨询。作为ImmiGo移民顾问，我可以提供关于新西兰和澳洲移民政策的专业指导。您想了解更多关于"${userMessage}"的哪些具体方面呢？(备注: 这是备份模式回复，API连接失败)`;
      }
      
      resolve(response);
    }, 1000);
  });
};

export default {
  getAIResponse
}; 