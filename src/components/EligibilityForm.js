import React, { useState } from 'react';
import './EligibilityForm.css';

const EligibilityForm = ({ onSubmitForm, onClose }) => {
  const [formData, setFormData] = useState({
    targetCountry: 'australia',
    age: '',
    education: 'bachelor',
    workExperience: '0-2',
    englishLevel: 'competent',
    occupation: '',
    familyConnections: 'no'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 准备提交给AI分析的问题
    const question = `
      请根据以下个人信息评估我的移民资格:
      目标国家: ${formData.targetCountry === 'australia' ? '澳洲' : '新西兰'}
      年龄: ${formData.age}
      学历: ${getEducationText(formData.education)}
      工作经验: ${getWorkExperienceText(formData.workExperience)}
      英语水平: ${getEnglishLevelText(formData.englishLevel)}
      职业: ${formData.occupation}
      家庭关系: ${formData.familyConnections === 'yes' ? '有' : '无'}${formData.targetCountry}亲属
    `;
    
    onSubmitForm(question);
    onClose();
  };

  const getEducationText = (value) => {
    const educationMap = {
      'highschool': '高中',
      'diploma': '大专/文凭',
      'bachelor': '本科学士',
      'master': '硕士',
      'phd': '博士'
    };
    return educationMap[value] || value;
  };

  const getWorkExperienceText = (value) => {
    const experienceMap = {
      '0-2': '0-2年',
      '3-5': '3-5年',
      '6-8': '6-8年',
      '8+': '8年以上'
    };
    return experienceMap[value] || value;
  };

  const getEnglishLevelText = (value) => {
    const englishMap = {
      'basic': '基础 (雅思 4-5分)',
      'competent': '良好 (雅思 6-6.5分)',
      'proficient': '熟练 (雅思 7-7.5分)',
      'superior': '精通 (雅思 8分以上)'
    };
    return englishMap[value] || value;
  };

  return (
    <div className="eligibility-form-overlay">
      <div className="eligibility-form-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>移民资格评估</h2>
        <p>请提供您的基本信息，我们将为您进行初步资格评估</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>目标国家</label>
            <select name="targetCountry" value={formData.targetCountry} onChange={handleChange}>
              <option value="australia">澳洲</option>
              <option value="newzealand">新西兰</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>年龄</label>
            <input 
              type="number" 
              name="age" 
              min="18" 
              max="65" 
              value={formData.age} 
              onChange={handleChange}
              required
              placeholder="18-65" 
            />
          </div>
          
          <div className="form-group">
            <label>最高学历</label>
            <select name="education" value={formData.education} onChange={handleChange}>
              <option value="highschool">高中</option>
              <option value="diploma">大专/文凭</option>
              <option value="bachelor">本科学士</option>
              <option value="master">硕士</option>
              <option value="phd">博士</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>相关工作经验</label>
            <select name="workExperience" value={formData.workExperience} onChange={handleChange}>
              <option value="0-2">0-2年</option>
              <option value="3-5">3-5年</option>
              <option value="6-8">6-8年</option>
              <option value="8+">8年以上</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>英语水平</label>
            <select name="englishLevel" value={formData.englishLevel} onChange={handleChange}>
              <option value="basic">基础 (雅思 4-5分)</option>
              <option value="competent">良好 (雅思 6-6.5分)</option>
              <option value="proficient">熟练 (雅思 7-7.5分)</option>
              <option value="superior">精通 (雅思 8分以上)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>职业</label>
            <input 
              type="text" 
              name="occupation" 
              value={formData.occupation} 
              onChange={handleChange}
              required
              placeholder="例如：软件工程师、会计师" 
            />
          </div>
          
          <div className="form-group">
            <label>是否有目标国家的亲属？</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="familyConnections" 
                  value="yes" 
                  checked={formData.familyConnections === 'yes'} 
                  onChange={handleChange} 
                />
                是
              </label>
              <label>
                <input 
                  type="radio" 
                  name="familyConnections" 
                  value="no" 
                  checked={formData.familyConnections === 'no'} 
                  onChange={handleChange} 
                />
                否
              </label>
            </div>
          </div>
          
          <button type="submit" className="submit-form-button">提交评估</button>
        </form>
      </div>
    </div>
  );
};

export default EligibilityForm; 