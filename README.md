# LearnUpon AI Assistant - Chatbot Frontend

A modern, responsive ChatGPT-like interface for the LearnUpon Learning Management System, powered by an AI teaching assistant.

## ✨ Features

- **Modern UI/UX Design**: Clean, professional interface with smooth animations
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Real-time Chat**: Interactive messaging with typing indicators
- **Markdown Support**: AI responses support markdown formatting
- **Copy Messages**: One-click copy functionality for AI responses
- **Auto-scroll**: Automatically scrolls to latest messages
- **Theme Persistence**: Remembers user's theme preference
- **Error Handling**: Graceful error messages and recovery
- **Accessibility**: Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- **Avatar Icons**: User and AI avatars in chat bubbles
- **Typing Indicator**: Beautiful typing animation while AI responds

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Tailwind CSS 3** - Styling and responsive design
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library (Feather icons)
- **React Markdown** - Markdown rendering
- **PostCSS** - CSS processing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:

- react & react-dom
- tailwindcss & autoprefixer
- axios
- react-markdown
- react-icons
- clsx

### 2. Environment Setup

No environment variables needed for the basic setup. The API endpoint is hardcoded to `http://localhost:8000/chat`.

To customize the API endpoint, modify the `API_ENDPOINT` in [src/hooks/useChat.js](src/hooks/useChat.js):

```javascript
const API_ENDPOINT = 'http://localhost:8000/chat';
```

### 3. Start Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js           # Navigation header with theme toggle
│   ├── ChatContainer.js    # Main chat display area
│   ├── MessageBubble.js    # Individual message component
│   ├── TypingIndicator.js  # Typing animation
│   ├── InputBar.js         # Message input form
│   └── EmptyState.js       # Welcome screen
├── hooks/
│   ├── useTheme.js         # Theme management hook
│   └── useChat.js          # Chat state and API integration
├── App.js                  # Main app component
├── index.js                # React entry point
└── index.css               # Global styles & animations

public/
└── index.html              # HTML template

tailwind.config.js          # Tailwind CSS configuration
postcss.config.js           # PostCSS configuration
package.json                # Dependencies and scripts
```

## 🎨 Color Palette

The app uses a custom color scheme defined in [tailwind.config.js](tailwind.config.js):

- **Primary**: #853953 (Deep Mauve) - Main accent color
- **Secondary**: #612D53 (Deep Purple) - Secondary accent
- **Light Background**: #F3F4F4
- **Dark Background**: #2C2C2C

All colors are customizable in the Tailwind config file.

## 🔌 API Integration

The frontend communicates with the backend via a simple REST API:

### Endpoint: `/chat`

**Method**: `POST`

**Request**:

```json
{
  "message": "Your question here"
}
```

**Response**:

```json
{
  "response": "AI's answer with **markdown** support"
}
```

**Error Response**:

```json
{
  "error": "Error message"
}
```

### Example Backend Implementation (Python Flask)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')

    # Call your Hugging Face model here
    response = call_huggingface_api(message)

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
```

## 🎯 Available Features

### Message Features

- ✅ Send messages with Enter key
- ✅ New line with Shift+Enter
- ✅ Copy message text
- ✅ Markdown formatting (bold, italic, lists, code blocks)
- ✅ Timestamp on each message

### UI Features

- ✅ Dark/Light theme toggle
- ✅ Auto-scroll to latest messages
- ✅ Smooth animations and transitions
- ✅ Typing indicator animation
- ✅ Empty state with suggestions
- ✅ Loading states
- ✅ Error messages
- ✅ Responsive layout

### Accessibility

- ✅ Keyboard navigation
- ✅ Semantic HTML
- ✅ ARIA labels where appropriate
- ✅ Focus management
- ✅ High contrast support

## 🔧 Customization

### Change Theme Colors

Edit [tailwind.config.js](tailwind.config.js):

```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    600: '#YOUR_HOVER_COLOR',
  },
}
```

### Modify API Endpoint

Edit [src/hooks/useChat.js](src/hooks/useChat.js):

```javascript
const API_ENDPOINT = 'YOUR_BACKEND_URL/chat';
```

### Add Custom Avatars

Edit avatar initials in:

- [src/components/MessageBubble.js](src/components/MessageBubble.js) - Bot avatar
- [src/components/TypingIndicator.js](src/components/TypingIndicator.js) - Typing indicator

### Customize Placeholder Text

Edit [src/components/InputBar.js](src/components/InputBar.js):

```javascript
placeholder = 'Your custom placeholder text...';
```

## 📱 Responsive Breakpoints

The app is responsive across all screen sizes:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Tailwind CSS handles responsive design automatically with utility classes prefixed with `sm:`, `md:`, `lg:`, etc.

## 🐛 Troubleshooting

### API Connection Error

If you see "Something went wrong" errors:

1. **Check backend is running**: Ensure your backend is running on `http://localhost:8000`
2. **Check CORS**: Add CORS headers to your backend
3. **Check API endpoint**: Verify the endpoint in `useChat.js` matches your backend

### Theme not persisting

Clear browser localStorage:

```javascript
localStorage.clear();
```

Then refresh the page.

### Messages not scrolling

Try clearing React DevTools cache or hard reload the browser (Ctrl+Shift+R).

## 📚 Component Documentation

### Header

Displays app name, theme toggle, user profile button, and clear chat button.

**Props**:

- `isDark` - Boolean indicating dark mode
- `onThemeToggle` - Callback for theme toggle
- `onClearChat` - Callback for clear chat

### ChatContainer

Displays all messages with auto-scroll functionality.

**Props**:

- `messages` - Array of message objects
- `loading` - Boolean indicating loading state

### MessageBubble

Individual message component with copy functionality.

**Props**:

- `message` - Message object
- `isUser` - Boolean indicating if message is from user

### InputBar

Text input area with send button.

**Props**:

- `onSendMessage` - Callback to send message
- `loading` - Boolean indicating loading state

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com)
- [React Markdown](https://github.com/remarkjs/react-markdown)

## 📄 License

This project is part of the LearnUpon Learning Management System.

## 🤝 Contributing

Feel free to modify and extend this chatbot interface to suit your needs. Some ideas:

- Add message reactions/reactions
- Implement voice input
- Add document upload support
- Create conversation history sidebar
- Add real-time collaboration features
- Implement message editing
- Add anonymous/guest mode

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Update API endpoint to production URL
- [ ] Enable CORS on backend
- [ ] Add environment variables for API URL
- [ ] Test dark/light mode thoroughly
- [ ] Test on mobile devices
- [ ] Optimize images and assets
- [ ] Add error logging/monitoring
- [ ] Test keyboard accessibility
- [ ] Add rate limiting
- [ ] Implement user authentication
- [ ] Add message persistence to backend

## 📞 Support

For issues or questions, refer to the component files which contain detailed comments and documentation.

---

**Built with ❤️ for LearnUpon**
