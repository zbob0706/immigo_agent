import React, { useState } from 'react';
import './KnowledgeBase.css';

const KnowledgeBase = ({ onSelectTopic }) => {
  const [activeCategory, setActiveCategory] = useState('australia');

  const knowledgeData = {
    australia: {
      name: '澳洲移民',
      topics: [
        { id: 'au-skilled', title: '技术移民', question: '澳洲技术移民有哪些类别？' },
        { id: 'au-family', title: '家庭团聚', question: '我可以申请父母移民澳洲吗？' },
        { id: 'au-points', title: '评分系统', question: '澳洲技术移民评分系统如何计算？' },
        { id: 'au-pr', title: '永久居留', question: '获得澳洲PR后多久可以申请入籍？' },
        { id: 'au-work', title: '工作签证', question: '482工作签证申请条件是什么？' }
      ]
    },
    newzealand: {
      name: '新西兰移民',
      topics: [
        { id: 'nz-skilled', title: '技术移民', question: '新西兰技术移民需要哪些条件？' },
        { id: 'nz-family', title: '家庭团聚', question: '如何通过家庭关系移民新西兰？' },
        { id: 'nz-points', title: '评分系统', question: '新西兰技术移民评分标准是什么？' },
        { id: 'nz-work', title: '工作签证', question: '新西兰工签转永居的流程是怎样的？' },
        { id: 'nz-business', title: '投资移民', question: '新西兰投资移民需要投资多少资金？' }
      ]
    },
    comparison: {
      name: '澳新比较',
      topics: [
        { id: 'comp-overview', title: '政策对比', question: '澳洲和新西兰的移民政策有什么主要区别？' },
        { id: 'comp-requirements', title: '要求比较', question: '澳洲和新西兰技术移民哪个更容易申请？' },
        { id: 'comp-living', title: '生活对比', question: '澳洲和新西兰的生活成本哪个更高？' },
        { id: 'comp-job', title: '就业机会', question: '澳洲和新西兰哪个就业机会更多？' }
      ]
    }
  };

  return (
    <div className="knowledge-base">
      <h2>移民知识库</h2>
      
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