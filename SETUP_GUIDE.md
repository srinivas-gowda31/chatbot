# LearnUpon Chatbot - Complete Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Backend (if not already running)

Ensure your backend is running on `http://localhost:8000` with a `/chat` endpoint:

```bash
# Terminal 1: Backend
python BACKEND_EXAMPLE.py
```

### 3. Start Frontend

```bash
# Terminal 2: Frontend
npm start
```

The app opens automatically at `http://localhost:3000`

---

## Detailed Setup Instructions

### Prerequisites Check

**Node.js Installation**:

```bash
node --version  # Should be v14+
npm --version   # Should be v6+
```

**Backend Check**:

```bash
curl http://localhost:8000/health
# Should return: {"status": "healthy"}
```

---

## Project Structure Explained

### Components

#### **Header.js** 📌

- **Purpose**: Top navigation bar
- **Features**:
  - Logo and app name
  - Theme toggle (dark/light)
  - Clear chat button
  - User profile icon
- **Key Props**: isDark, onThemeToggle, onClearChat

#### **ChatContainer.js** 💬

- **Purpose**: Main chat display area
- **Features**:
  - Scrollable message area
  - Auto-scroll to latest message
  - Loading state display
  - Empty state with suggestions
- **Key Props**: messages, loading

#### **MessageBubble.js** 🗨️

- **Purpose**: Individual message display
- **Features**:
  - Different styling for user vs AI
  - Markdown rendering
  - Copy button for AI messages
  - Timestamps
  - Avatar icons
- **Key Props**: message, isUser

#### **InputBar.js** ⌨️

- **Purpose**: Message input interface
- **Features**:
  - Auto-resizing textarea
  - Enter to send, Shift+Enter for new line
  - Send button with loading state
  - Attachment button (placeholder)
  - Help text with keyboard shortcuts
- **Key Props**: onSendMessage, loading

#### **TypingIndicator.js** ⏳

- **Purpose**: Show when AI is thinking
- **Features**:
  - Animated dots
  - Smooth fade-in
  - Matches AI message styling

#### **EmptyState.js** 🎯

- **Purpose**: Welcome screen
- **Features**:
  - Welcome message
  - Suggested questions
  - Encourages first message

### Hooks

#### **useTheme.js** 🌓

- **Purpose**: Manage dark/light mode
- **Features**:
  - Persists preference to localStorage
  - Detects system preference
  - Updates document class
- **Returns**: { isDark, toggleTheme }

#### **useChat.js** 💭

- **Purpose**: Manage chat state and API
- **Features**:
  - Send messages to backend
  - Track loading state
  - Handle errors
  - Clear chat history
- **Returns**: { messages, loading, error, sendMessage, clearChat }

---

## Customization Guide

### 🎨 Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_HEX_COLOR',  // Main color
        600: '#YOUR_HEX_COLOR',  // Hover color
      },
      secondary: {
        500: '#YOUR_HEX_COLOR',
      },
    },
  },
}
```

### 🔗 API Endpoint

Edit `src/hooks/useChat.js`:

```javascript
const API_ENDPOINT = 'http://your-backend.com/chat';
```

Or use environment variable:

```javascript
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000/chat';
```

Then create `.env.local`:

```
REACT_APP_API_ENDPOINT=http://your-backend.com/chat
```

### 🖼️ Add Custom Avatar

In `MessageBubble.js`:

```javascript
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
  {isUser ? '👤' : '🤖'} {/* Change these emojis */}
</div>
```

### 💬 Change Placeholder Text

In `InputBar.js`:

```javascript
placeholder = 'Your custom text here...';
```

### ✏️ Modify Empty State

In `EmptyState.js`:

```javascript
<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
  Your welcome message here
</h2>
```

---

## API Reference

### Send Message

**Endpoint**: `POST /chat`

**Request**:

```json
{
  "message": "What is machine learning?"
}
```

**Response** (Success):

```json
{
  "response": "Machine learning is a branch of AI that allows computers to learn from data..."
}
```

**Response** (Error):

```json
{
  "error": "Something went wrong"
}
```

### Full cURL Example

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?"}'
```

---

## Keyboard Shortcuts

| Shortcut        | Action                 |
| --------------- | ---------------------- |
| `Enter`         | Send message           |
| `Shift + Enter` | New line in message    |
| `Tab`           | Focus next element     |
| `Shift + Tab`   | Focus previous element |

---

## Browser Support

✅ Chrome/Edge v88+
✅ Firefox v87+
✅ Safari v14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Optimization

### Code Splitting

Already optimized with React lazy loading.

### Image Optimization

SVG icons used (no image processing needed).

### CSS Optimization

Tailwind purges unused styles in production.

### API Caching

Add in backend:

```python
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response
```

---

## Troubleshooting

### Issue: "Cannot GET /chat" Error

**Solution**:

1. Check backend is running on port 8000
2. Verify endpoint is `/chat` not `/api/chat`
3. Check `API_ENDPOINT` in `useChat.js`

### Issue: CORS Error

**Solution**: Add to backend:

```python
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/chat": {"origins": "*"}})
```

### Issue: Dark mode not applying

**Solution**:

1. Clear localStorage: `localStorage.clear()`
2. Hard reload: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check if Tailwind dark mode is enabled in `tailwind.config.js`

### Issue: Textarea not expanding

**Solution**: Check browser console for JavaScript errors. Ensure no CSS conflicts.

### Issue: Messages lag or stutter

**Solution**:

1. Reduce animation duration in `index.css`
2. Disable auto-scroll by removing `scrollIntoView` in `ChatContainer.js`
3. Check backend response time

---

## Deployment

### Prerequisites

- Node.js installed
- npm modules installed
- Backend running on production URL

### Build for Production

```bash
npm run build
```

This creates optimized build in `build/` folder.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag-and-drop 'build' folder to Netlify
```

### Update Production API Endpoint

Before deploying, update in `src/hooks/useChat.js`:

```javascript
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'https://your-api.com/chat';
```

---

## Environment Variables

Create `.env.local`:

```
REACT_APP_API_ENDPOINT=http://localhost:8000/chat
REACT_APP_APP_NAME=LearnUpon AI Assistant
```

Access in code:

```javascript
const API_URL = process.env.REACT_APP_API_ENDPOINT;
```

---

## Security Checklist

- ✅ No API keys in frontend code
- ✅ Backend handles Hugging Face API key securely
- ✅ CORS configured on backend
- ✅ Input validation on backend
- ✅ Rate limiting implemented
- ✅ Error messages don't expose sensitive info
- ✅ HTTPS used in production
- ✅ Content Security Policy headers set

---

## Next Steps

1. **Connect Backend**: Ensure your backend accepts POST to `/chat`
2. **Test Locally**: Run `npm start` and send test messages
3. **Customize**: Update colors, text, and branding
4. **Deploy**: Build and deploy to your hosting platform
5. **Monitor**: Add error tracking (e.g., Sentry)
6. **Iterate**: Gather user feedback and improve

---

## Support & Resources

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Hugging Face**: https://huggingface.co
- **Axios**: https://axios-http.com

---

**Happy Coding! 🚀**
