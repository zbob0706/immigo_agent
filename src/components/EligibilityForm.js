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
    
    // Prepare question for AI analysis
    const question = `
      Please assess my immigration eligibility based on the following information:
      Target Country: ${formData.targetCountry === 'australia' ? 'Australia' : 'New Zealand'}
      Age: ${formData.age}
      Education: ${getEducationText(formData.education)}
      Work Experience: ${getWorkExperienceText(formData.workExperience)}
      English Level: ${getEnglishLevelText(formData.englishLevel)}
      Occupation: ${formData.occupation}
      Family Connections: ${formData.familyConnections === 'yes' ? 'Have' : 'No'} relatives in ${formData.targetCountry}
    `;
    
    onSubmitForm(question);
    onClose();
  };

  const getEducationText = (value) => {
    const educationMap = {
      'highschool': 'High School',
      'diploma': 'Diploma/Certificate',
      'bachelor': 'Bachelor\'s Degree',
      'master': 'Master\'s Degree',
      'phd': 'PhD/Doctorate'
    };
    return educationMap[value] || value;
  };

  const getWorkExperienceText = (value) => {
    const experienceMap = {
      '0-2': '0-2 years',
      '3-5': '3-5 years',
      '6-8': '6-8 years',
      '8+': '8+ years'
    };
    return experienceMap[value] || value;
  };

  const getEnglishLevelText = (value) => {
    const englishMap = {
      'basic': 'Basic (IELTS 4-5)',
      'competent': 'Competent (IELTS 6-6.5)',
      'proficient': 'Proficient (IELTS 7-7.5)',
      'superior': 'Superior (IELTS 8+)'
    };
    return englishMap[value] || value;
  };

  return (
    <div className="eligibility-form-overlay">
      <div className="eligibility-form-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Immigration Eligibility Assessment</h2>
        <p>Please provide your basic information for an initial eligibility assessment</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Target Country</label>
            <select name="targetCountry" value={formData.targetCountry} onChange={handleChange}>
              <option value="australia">Australia</option>
              <option value="newzealand">New Zealand</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Age</label>
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
            <label>Highest Education</label>
            <select name="education" value={formData.education} onChange={handleChange}>
              <option value="highschool">High School</option>
              <option value="diploma">Diploma/Certificate</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD/Doctorate</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Relevant Work Experience</label>
            <select name="workExperience" value={formData.workExperience} onChange={handleChange}>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-8">6-8 years</option>
              <option value="8+">8+ years</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>English Level</label>
            <select name="englishLevel" value={formData.englishLevel} onChange={handleChange}>
              <option value="basic">Basic (IELTS 4-5)</option>
              <option value="competent">Competent (IELTS 6-6.5)</option>
              <option value="proficient">Proficient (IELTS 7-7.5)</option>
              <option value="superior">Superior (IELTS 8+)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Occupation</label>
            <input 
              type="text" 
              name="occupation" 
              value={formData.occupation} 
              onChange={handleChange}
              required
              placeholder="e.g., Software Engineer, Accountant" 
            />
          </div>
          
          <div className="form-group">
            <label>Do you have relatives in your target country?</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="familyConnections" 
                  value="yes" 
                  checked={formData.familyConnections === 'yes'} 
                  onChange={handleChange} 
                />
                Yes
              </label>
              <label>
                <input 
                  type="radio" 
                  name="familyConnections" 
                  value="no" 
                  checked={formData.familyConnections === 'no'} 
                  onChange={handleChange} 
                />
                No
              </label>
            </div>
          </div>
          
          <button type="submit" className="submit-form-button">Submit Assessment</button>
        </form>
      </div>
    </div>
  );
};

export default EligibilityForm; 