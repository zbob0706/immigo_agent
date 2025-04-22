import React, { useState } from 'react';
import './KnowledgeBase.css';

const KnowledgeBase = ({ onSelectTopic }) => {
  const [activeCategory, setActiveCategory] = useState('australia');

  const knowledgeData = {
    australia: {
      name: 'Australia Immigration',
      topics: [
        { id: 'au-skilled', title: 'Skilled Migration', question: 'What categories of skilled migration are available in Australia?' },
        { id: 'au-family', title: 'Family Reunion', question: 'Can I apply for parent migration to Australia?' },
        { id: 'au-points', title: 'Points System', question: 'How is the Australian skilled migration points system calculated?' },
        { id: 'au-pr', title: 'Permanent Residency', question: 'How long after getting Australian PR can I apply for citizenship?' },
        { id: 'au-work', title: 'Work Visa', question: 'What are the conditions for a 482 work visa application?' }
      ]
    },
    newzealand: {
      name: 'New Zealand Immigration',
      topics: [
        { id: 'nz-skilled', title: 'Skilled Migration', question: 'What are the requirements for New Zealand skilled migration?' },
        { id: 'nz-family', title: 'Family Reunion', question: 'How can I immigrate to New Zealand through family relationships?' },
        { id: 'nz-points', title: 'Points System', question: 'What are the scoring criteria for New Zealand skilled migration?' },
        { id: 'nz-work', title: 'Work Visa', question: 'What is the process for converting a New Zealand work visa to permanent residency?' },
        { id: 'nz-business', title: 'Investment Migration', question: 'How much investment is required for New Zealand investor migration?' }
      ]
    },
    comparison: {
      name: 'AU-NZ Comparison',
      topics: [
        { id: 'comp-overview', title: 'Policy Comparison', question: 'What are the main differences between Australia and New Zealand immigration policies?' },
        { id: 'comp-requirements', title: 'Requirements', question: 'Is skilled migration to Australia or New Zealand easier to apply for?' },
        { id: 'comp-living', title: 'Living Costs', question: 'Which has higher living costs, Australia or New Zealand?' },
        { id: 'comp-job', title: 'Job Opportunities', question: 'Which country offers more job opportunities, Australia or New Zealand?' }
      ]
    }
  };

  return (
    <div className="knowledge-base">
      <h2>Immigration Knowledge Base</h2>
      
      <div className="category-tabs">
        {Object.keys(knowledgeData).map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {knowledgeData[category].name}
          </button>
        ))}
      </div>
      
      <div className="topics-container">
        {knowledgeData[activeCategory].topics.map(topic => (
          <div
            key={topic.id}
            className="topic-card"
            onClick={() => onSelectTopic(topic.question)}
          >
            <h3>{topic.title}</h3>
            <p>{topic.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase; 