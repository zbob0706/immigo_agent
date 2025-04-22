# ImmiGo - 新西兰和澳洲移民AI顾问

ImmiGo是一个为计划移民到新西兰或澳洲的人士提供咨询的AI助手。它能够回答关于移民政策、签证类型、申请流程和资格要求的问题。

## 功能特点

- 为用户提供新西兰和澳洲移民相关问题的解答
- 基于用户提供的个人信息评估移民资格
- 解释不同签证类型和申请要求
- 提供移民流程指导
- 分享最新的移民政策和法规信息

## 技术栈

- React 19 - 前端框架
- OpenAI API - 知识引擎
- CSS3 - 样式和布局

## 开发指南

### 安装依赖

```bash
npm install
```

### 设置环境变量

在项目根目录创建`.env`文件，设置以下环境变量：

```
# OpenAI API密钥 - 必需
REACT_APP_AI_API_KEY=your_api_key_here

# API端点
REACT_APP_AI_API_URL=https://api.openai.com/v1/chat/completions

# 其他配置
REACT_APP_MAX_HISTORY_LENGTH=20
```

**重要安全提示**：
- 永远不要在公共代码库中提交您的API密钥
- 确保`.env`文件已添加到`.gitignore`中
- 在生产环境部署前请使用环境变量管理系统

### 启动开发服务器

```bash
npm start
```

这将在[http://localhost:3000](http://localhost:3000)启动应用。

### 构建生产版本

```bash
npm run build
```

## AI服务配置

ImmiGo使用OpenAI的API来为用户提供移民咨询。系统配置了以下参数：

- **模型**：gpt-3.5-turbo
- **系统提示词**：定义了AI顾问的身份和知识范围
- **消息历史**：限制为最近20条消息
- **输出**：最大1000 tokens
- **温度**：0.7（在准确性与创造性之间平衡）

系统还配置了备份模式，当API连接失败时将使用预设的回复。


- **项目目的**：设计并开发一个新西兰和澳洲移民顾问AI Agent
- **完成的任务**：
  - 创建基本的聊天界面
  - 配置AI服务
  - 开发知识库组件
  - 实现移民资格评估表单
- **关键决策**：
  - 使用React作为前端框架
  - 设计模块化组件架构
  - 创建模拟AI服务用于开发和测试
  - 实现移民资格评估功能
- **技术栈**：React, JavaScript, CSS, AI API
- **修改的文件**：
  - src/App.js
  - src/App.css
  - src/services/aiService.js
  - src/components/KnowledgeBase.js
  - src/components/KnowledgeBase.css
  - src/components/EligibilityForm.js
  - src/components/EligibilityForm.css
  - .env
  - README.md
  - .gitignore

### 2023-11-03 10:45
- **项目目的**：配置OpenAI API连接和改进历史记录管理
- **完成的任务**：
  - 配置了真实的OpenAI API连接
  - 实现了聊天历史长度管理机制
  - 添加了API错误处理和备份模式
  - 更新了文档和开发指南
- **关键决策**：
  - 保留模拟API功能作为备份方案
  - 限制API请求中的消息历史长度
  - 优化UI中的历史记录管理
- **技术栈**：React, OpenAI API
- **修改的文件**：
  - src/services/aiService.js
  - src/App.js
  - README.md

## 后续开发计划

1. 添加更多特定移民类型的详细信息
2. 实现用户认证和对话历史保存功能
3. 增加移民进度跟踪功能
4. 优化移动端体验
5. 添加多语言支持
6. 实现数据分析和用户偏好学习

## 贡献指南

欢迎提交问题和拉取请求。对于重大更改，请先开启一个问题进行讨论。

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
