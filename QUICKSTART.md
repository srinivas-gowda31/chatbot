# 🚀 LearnUpon Chatbot - Quick Start (5 Minutes)

## TL;DR - Get Running Now

### 1️⃣ Install Packages

```bash
npm install
```

### 2️⃣ Start App

```bash
npm start
```

The app opens at `http://localhost:3000`

### 3️⃣ Connect Backend

Make sure your backend runs on `http://localhost:8000` with a `/chat` endpoint.

**Test with curl**:

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

**Expected response**:

```json
{
  "response": "AI response here"
}
```

---

## 📁 Key Files to Edit

### Change API Endpoint

📄 `src/hooks/useChat.js` - Line 5

```javascript
const API_ENDPOINT = 'http://localhost:8000/chat'; // Update this
```

### Change Colors

📄 `tailwind.config.js` - Colors section

```javascript
primary: { 500: '#853953' },
secondary: { 500: '#612D53' }
```

### Change App Name

📄 `src/components/Header.js` - Line 13

```javascript
<h1 className="text-xl font-bold">LearnUpon</h1>
```

---

## 📚 Documentation

| File                                     | Purpose                     |
| ---------------------------------------- | --------------------------- |
| [README.md](README.md)                   | Full documentation          |
| [SETUP_GUIDE.md](SETUP_GUIDE.md)         | Detailed setup instructions |
| [COMPONENTS_DOCS.md](COMPONENTS_DOCS.md) | Component reference         |
| [FEATURES.md](FEATURES.md)               | Feature list & specs        |
| [BACKEND_EXAMPLE.py](BACKEND_EXAMPLE.py) | Example backend code        |

---

## 🎯 File Structure

```
src/
├── App.js ........................ Main component
├── components/
│   ├── Header.js ................. Top bar
│   ├── ChatContainer.js .......... Chat area
│   ├── MessageBubble.js .......... Messages
│   ├── InputBar.js ............... Input
│   ├── TypingIndicator.js ........ Loading
│   └── EmptyState.js ............. Welcome
└── hooks/
    ├── useTheme.js ............... Dark mode
    └── useChat.js ................ API calls
```

---

## ✨ Features

✅ Dark/Light mode
✅ Responsive design
✅ Markdown support
✅ Copy messages
✅ Auto-scroll
✅ Typing animation
✅ Error handling

---

## 🔧 Custom Backend

### Python Example

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']

    # Your AI logic here
    response = "AI response"

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
```

### Node.js Example

```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', (req, res) => {
  const { message } = req.body;

  // Your AI logic here
  const response = 'AI response';

  res.json({ response });
});

app.listen(8000, () => {
  console.log('Running on http://localhost:8000');
});
```

---

## 🐛 Troubleshooting

### "Can't connect to backend"

- Make sure backend runs on `http://localhost:8000`
- Check CORS is enabled on backend
- Test endpoint with curl

### Dark mode not working

- Clear browser cache: `localStorage.clear()`
- Hard refresh: `Ctrl+Shift+R`

### Messages don't scroll

- Check browser console for errors
- Ensure messages array is updating
- Try hard refresh

---

## 📱 Test on Mobile

### Local Device

```bash
# Get your IP
ipconfig getifaddr en0  # Mac
ipconfig             # Windows

# Then visit: http://YOUR_IP:3000
```

### Browser DevTools

1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Test responsive design

---

## 🎨 Quick Customizations

### Change Primary Color

In `tailwind.config.js`:

```javascript
primary: {
  500: '#YOUR_HEX_COLOR',
  600: '#YOUR_DARKER_HEX_COLOR'
}
```

### Add Your Avatar

In `src/components/MessageBubble.js`:

```javascript
<div>👤 or 🤖</div> {/* Change these */}
```

### Change Placeholder

In `src/components/InputBar.js`:

```javascript
placeholder = 'Your custom text...';
```

---

## 🚀 Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag build/ folder to netlify.com
```

### Traditional Hosting

```bash
npm run build
# Upload build/ folder to your host
```

---

## 📞 Need Help?

- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed steps
- See [COMPONENTS_DOCS.md](COMPONENTS_DOCS.md) for component API
- Review [BACKEND_EXAMPLE.py](BACKEND_EXAMPLE.py) for backend reference

---

## ⚡ Performance

- Initial load: ~2 seconds
- Message send: ~1 second (depends on backend)
- Theme toggle: Instant
- Smooth animations throughout

---

## ✅ Checklist

- [ ] Backend running on `:8000`
- [ ] Frontend running on `:3000`
- [ ] API endpoint correct in `useChat.js`
- [ ] Can send test message
- [ ] Dark mode works
- [ ] Responsive on mobile

---

**Created**: March 2026
**Status**: ✅ Ready to Use

Happy chatting! 🎉
