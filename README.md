# ImmiGo - New Zealand and Australia Immigration AI Consultant

ImmiGo is an AI assistant that provides consultation for people planning to immigrate to New Zealand or Australia. It can answer questions about immigration policies, visa types, application processes, and eligibility requirements.

## Features

- Provides answers to New Zealand and Australia immigration-related questions
- Assesses immigration eligibility based on user-provided personal information
- Explains different visa types and application requirements
- Offers guidance on immigration processes
- Shares up-to-date immigration policy and regulation information

## Technology Stack

- React 19 - Frontend framework
- OpenAI API - Knowledge engine
- CSS3 - Styling and layout

## Development Guide

### Installing Dependencies

```bash
npm install
```

### Setting Environment Variables

Create a `.env` file in the project root and set the following environment variables:

```
# OpenAI API key - Required
REACT_APP_AI_API_KEY=your_api_key_here

# API endpoint
REACT_APP_AI_API_URL=https://api.openai.com/v1/chat/completions

# Other configurations
REACT_APP_MAX_HISTORY_LENGTH=20
```

**Important Security Notes**:
- Never commit your API key to a public code repository
- Ensure the `.env` file is added to `.gitignore`
- Use an environment variable management system before deploying to production

### Starting the Development Server

```bash
npm start
```

This will launch the application at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

## AI Service Configuration

ImmiGo uses OpenAI's API to provide immigration consultation. The system is configured with the following parameters:

- **Model**: gpt-3.5-turbo
- **System Prompt**: Defines the AI consultant's identity and knowledge scope
- **Message History**: Limited to the most recent 20 messages
- **Output**: Maximum 1000 tokens
- **Temperature**: 0.7 (balancing accuracy and creativity)

The system also has a backup mode that uses preset responses when the API connection fails.

## Session Logs

### 2023-11-02 15:30
- **Project Purpose**: Design and develop an AI Agent for New Zealand and Australia immigration consultation
- **Completed Tasks**:
  - Created basic chat interface
  - Configured AI service
  - Developed knowledge base component
  - Implemented immigration eligibility assessment form
- **Key Decisions**:
  - Used React as the frontend framework
  - Designed modular component architecture
  - Created mock AI service for development and testing
  - Implemented immigration eligibility assessment functionality
- **Technology Stack**: React, JavaScript, CSS, AI API
- **Modified Files**:
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
- **Project Purpose**: Configure OpenAI API connection and improve history management
- **Completed Tasks**:
  - Configured real OpenAI API connection
  - Implemented chat history length management mechanism
  - Added API error handling and backup mode
  - Updated documentation and development guide
- **Key Decisions**:
  - Retained mock API functionality as backup solution
  - Limited message history length in API requests
  - Optimized history record management in UI
- **Technology Stack**: React, OpenAI API
- **Modified Files**:
  - src/services/aiService.js
  - src/App.js
  - README.md

### 2023-11-04 09:15
- **Project Purpose**: Convert all project content to English to comply with project rules
- **Completed Tasks**:
  - Updated UI text from Chinese to English
  - Translated all code comments
  - Modified system prompt to use English
  - Translated mock responses in AI service
  - Updated eligibility form with English translations
  - Added proper session summary in README
- **Key Decisions**:
  - Maintained consistent terminology across components
  - Ensured all user-facing elements are in English
  - Preserved functionality while changing language
- **Technology Stack**: React, JavaScript
- **Modified Files**:
  - src/services/aiService.js
  - src/App.js
  - src/components/KnowledgeBase.js
  - src/components/EligibilityForm.js
  - README.md

## Future Development Plans

1. Add more detailed information about specific immigration types
2. Implement user authentication and conversation history saving
3. Add immigration progress tracking functionality
4. Optimize mobile experience
5. Add multi-language support
6. Implement data analysis and user preference learning

## Contribution Guidelines

Contributions through issues and pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

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
