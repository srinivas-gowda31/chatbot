# LearnUpon Components Documentation

## Table of Contents

1. [Header](#header)
2. [ChatContainer](#chatcontainer)
3. [MessageBubble](#messagebubble)
4. [InputBar](#inputbar)
5. [TypingIndicator](#typingindicator)
6. [EmptyState](#emptystate)
7. [Hooks](#hooks)

---

## Header

**Location**: `src/components/Header.js`

### Purpose

Top navigation bar displaying app name, theme toggle, user profile, and clear chat button.

### Props

| Prop            | Type       | Description                           |
| --------------- | ---------- | ------------------------------------- |
| `isDark`        | `boolean`  | Current theme state                   |
| `onThemeToggle` | `function` | Callback when theme toggle is clicked |
| `onClearChat`   | `function` | Callback when clear chat is clicked   |

### Usage

```jsx
<Header
  isDark={isDark}
  onThemeToggle={toggleTheme}
  onClearChat={handleClearChat}
/>
```

### Features

- **Logo**: Gradient background with "L" icon
- **App Name**: "LearnUpon AI Assistant"
- **Theme Toggle**: Sun/Moon icon that switches between themes
- **Clear Button**: Clears chat history with confirmation
- **User Profile**: Profile button with icon
- **Responsive**: Adapts to mobile screens

### Styling Classes

- Sticky positioning at top
- Shadow effect with `shadow-soft`
- Dark mode support with `dark:bg-[#2C2C2C]`
- Smooth transitions

---

## ChatContainer

**Location**: `src/components/ChatContainer.js`

### Purpose

Main scrollable area displaying all messages in the conversation.

### Props

| Prop       | Type      | Description              |
| ---------- | --------- | ------------------------ |
| `messages` | `array`   | Array of message objects |
| `loading`  | `boolean` | Show typing indicator    |

### Usage

```jsx
<ChatContainer messages={messages} loading={loading} />
```

### Message Object Structure

```javascript
{
  id: 1234567890,           // Unique timestamp-based ID
  text: "User's message",   // Message content
  sender: "user" | "bot",   // Who sent it
  timestamp: Date,          // JavaScript Date object
  isError: false           // Optional: marks error messages
}
```

### Features

- **Auto-scroll**: Automatically scrolls to latest message
- **Empty State**: Shows welcome screen when no messages
- **Loading Indicator**: Shows typing animation while AI responds
- **Smooth Scrolling**: Uses `scrollIntoView({ behavior: 'smooth' })`
- **Responsive**: Adapts to all screen sizes

### Key Behaviors

- Scrolls when new messages arrive
- Scrolls when loading state changes
- Empty state displays helpful suggestions
- Dark mode compatible

---

## MessageBubble

**Location**: `src/components/MessageBubble.js`

### Purpose

Individual message component with styling, copy functionality, and markdown support.

### Props

| Prop      | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `message` | `object`  | Message object with text, sender, etc |
| `isUser`  | `boolean` | Whether message is from user or AI    |

### Usage

```jsx
<MessageBubble message={messageObject} isUser={true} />
```

### Features

#### Visual Features

- **Different Styling**: User messages blue, AI messages gray
- **Avatars**: "U" for user, "AI" for bot
- **Timestamps**: Formatted time display
- **Rounded Bubbles**: Different radius for left/right messages
- **Animation**: Smooth fade-in animation

#### Functionality

- **Copy Button**: One-click copy for AI responses
- **Copy Confirmation**: Shows checkmark after copying
- **Markdown Support**: Renders bold, italic, lists, code blocks
- **Time Formatting**: 12-hour format (e.g., "02:30 PM")

#### Styling Logic

```
User Message:
- Align: Right
- Background: Primary blue (#853953)
- Text: White
- Avatar: Blue "U"

AI Message:
- Align: Left
- Background: Light gray
- Text: Dark gray
- Avatar: Gradient "AI"

Error Message:
- Background: Light red
- Text: Dark red
```

### Markdown Features

The component supports:

```markdown
**bold text** → <strong>bold text</strong>
_italic text_ → <em>italic text</em>

- list item → <li>list item</li>

1. numbered → <ol><li>numbered</li></ol>
   `code` → <code>code</code>
```

---

## InputBar

**Location**: `src/components/InputBar.js`

### Purpose

Message input interface with send button and keyboard support.

### Props

| Prop            | Type       | Description                 |
| --------------- | ---------- | --------------------------- |
| `onSendMessage` | `function` | Callback to send message    |
| `loading`       | `boolean`  | Disable input while loading |

### Usage

```jsx
<InputBar onSendMessage={sendMessage} loading={loading} />
```

### Features

#### Input Features

- **Auto-resize Textarea**: Expands as user types
- **Min Height**: 44px (touchable on mobile)
- **Max Height**: 120px (prevents huge textarea)
- **Placeholder**: "Ask your AI assistant anything..."

#### Send Methods

1. **Enter Key**: Sends message immediately
2. **Shift+Enter**: Adds new line
3. **Send Button**: Manual send with mouse
4. **Mobile**: Full-width interface

#### Button States

- **Normal**: Blue primary color
- **Hover**: Darker blue
- **Disabled**: Gray (while loading or empty)
- **Loading**: Disabled, showed as gray

#### Accessibility

- Keyboard shortcuts displayed
- Proper labels and titles
- Focus management
- Disabled state when loading

---

## TypingIndicator

**Location**: `src/components/TypingIndicator.js`

### Purpose

Show animated typing indicator while AI is generating response.

### Props

None - Self-contained component

### Usage

```jsx
{
  loading && <TypingIndicator />;
}
```

### Features

- **Animated Dots**: 3 bouncing dots
- **Smooth Animation**: 1.4s cycle with staggered delays
- **Matches AI Style**: Looks like AI message bubble
- **Fade-in Animation**: Smooth entrance
- **Automatic Removal**: Disappears when loading = false

### Animation Details

```
Dot 1: Animation starts at 0ms
Dot 2: Animation starts at 200ms (staggered)
Dot 3: Animation starts at 400ms (staggered)
```

---

## EmptyState

**Location**: `src/components/EmptyState.js`

### Purpose

Welcome screen displayed when no messages exist.

### Props

None - Self-contained component

### Usage

```jsx
{
  messages.length === 0 && <EmptyState />;
}
```

### Features

- **Welcome Message**: "Start Your Learning Journey"
- **Icon**: Message circle icon with gradient background
- **Suggested Questions**: 3 example questions to get started
- **Encouragement**: Helpful description text
- **Responsive**: Adapts to all screen sizes
- **Dark Mode**: Proper contrast in dark theme

### Content

```
"Start Your Learning Journey"
"Ask questions, get explanations, or discuss topics..."

Example questions:
• "Explain quantum physics in simple terms"
• "How do I solve this math problem?"
• "What's the capital of France?"
```

---

## Hooks

### useTheme

**Location**: `src/hooks/useTheme.js`

#### Purpose

Manage dark/light mode theme with persistence.

#### Usage

```javascript
const { isDark, toggleTheme } = useTheme();
```

#### Behavior

1. **On Mount**:
   - Checks localStorage for saved preference
   - Falls back to system preference if not saved
   - Applies theme class to document

2. **On Toggle**:
   - Flips isDark state
   - Updates document class
   - Saves preference to localStorage

#### localStorage Key

```
Key: 'learnupon-theme'
Value: 'dark' | 'light'
```

#### Implementation Details

```javascript
// Check saved preference
const saved = localStorage.getItem('learnupon-theme');

// Fall back to system preference
window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply to document
document.documentElement.classList.add('dark');

// Tailwind responds to 'dark' class
// Example in CSS: dark:bg-[#2C2C2C]
```

---

### useChat

**Location**: `src/hooks/useChat.js`

#### Purpose

Manage chat state and API integration.

#### Usage

```javascript
const { messages, loading, error, sendMessage, clearChat } = useChat();
```

#### Returned Values

| Value         | Type       | Description                     |
| ------------- | ---------- | ------------------------------- |
| `messages`    | `array`    | All messages in conversation    |
| `loading`     | `boolean`  | Currently awaiting API response |
| `error`       | `string`   | Error message, if any           |
| `sendMessage` | `function` | Send new message function       |
| `clearChat`   | `function` | Clear all messages function     |

#### sendMessage Function

**Signature**:

```javascript
sendMessage(userMessage: string) => Promise<void>
```

**Behavior**:

1. Validates message is not empty
2. Adds user message to state
3. Sets loading to true
4. Calls API endpoint
5. Adds AI response to state
6. Handles errors gracefully
7. Sets loading to false

**Example**:

```javascript
await sendMessage('What is React?');
```

#### clearChat Function

**Signature**:

```javascript
clearChat() => void
```

**Behavior**:

- Clears messages array
- Resets error state
- Used with confirmation dialog

#### API Integration

**Endpoint**: `http://localhost:8000/chat`

**Request**:

```json
{
  "message": "User's message"
}
```

**Response**:

```json
{
  "response": "AI's response"
}
```

#### Error Handling

If API call fails:

1. Logs error to console
2. Sets error state
3. Adds bot error message: "I'm sorry, I encountered an error..."
4. Message marked with `isError: true`
5. User can retry

---

## Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── ThemeToggle
│   ├── ClearButton
│   └── UserProfile
├── ChatContainer
│   ├── EmptyState (or)
│   ├── MessageBubble (repeated)
│   ├── TypingIndicator (conditional)
│   └── ScrollAnchor
└── InputBar
    ├── AttachmentButton
    ├── Textarea
    └── SendButton
```

---

## State Flow Diagram

```
User Input
    ↓
InputBar (onSendMessage called)
    ↓
useChat (sendMessage)
    ↓
Add User Message → State Update
    ↓
Set Loading = true
    ↓
API Call to Backend
    ↓
Response Received
    ↓
Add Bot Message → State Update
    ↓
Set Loading = false
    ↓
ChatContainer Re-renders
    ↓
Auto-scroll to Latest Message
```

---

## Styling Approach

### Tailwind CSS Classes

**Utility Classes Used**:

```
Layout: flex, justify-center, items-center, gap-x
Sizing: w-full, h-screen, px-4, py-3
Colors: bg-primary-500, text-white, dark:text-white
Effects: shadow-soft, rounded-lg, transition-colors
Typography: text-lg, font-bold, font-semi-bold
Responsive: sm:, md:, lg:, xl:
Dark Mode: dark:bg-[#2C2C2C]
```

### Custom CSS

Located in `src/index.css`:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.4;
  }
  30% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
.typing-indicator span {
  animation: typing 1.4s infinite;
}
```

---

## Accessibility Features

✅ **Semantic HTML**: `<header>`, `<button>`, `<form>`
✅ **ARIA Labels**: `aria-label` on icon buttons
✅ **Title Attributes**: Hover tooltips on actions
✅ **Keyboard Navigation**: Tab through elements
✅ **Focus Management**: Visible focus states
✅ **Color Contrast**: Meets WCAG AA standards
✅ **Text Alternatives**: Icons have text labels
✅ **Disabled State**: Disabled buttons are visually distinct

---

## Performance Optimization

- **Memoization**: Components use functional patterns
- **Callback Stability**: useCallback prevents re-renders
- **CSS-in-JS**: Minimal JavaScript for animations
- **Lazy Loading**: Images load on demand
- **Chat History**: No pagination needed for MVP

---

## Browser Compatibility

| Browser          | Support       |
| ---------------- | ------------- |
| Chrome           | ✅ 88+        |
| Firefox          | ✅ 87+        |
| Safari           | ✅ 14+        |
| Edge             | ✅ 88+        |
| Mobile (iOS)     | ✅ Safari 14+ |
| Mobile (Android) | ✅ Chrome 88+ |

---

## Future Enhancement Ideas

1. **Message Reactions**: Add emoji reactions
2. **Voice Input**: Speak to chat
3. **File Upload**: Share documents
4. **Conversation History**: Sidebar with previous chats
5. **Message Editing**: Edit sent messages
6. **Pin Messages**: Save important messages
7. **Search**: Find messages by keyword
8. **Export Chat**: Download conversation as PDF

---

**Last Updated**: March 2026
**Version**: 1.0.0
