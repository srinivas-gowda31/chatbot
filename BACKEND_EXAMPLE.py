"""
Example Backend Implementation for LearnUpon Chatbot
This is a sample Flask backend that integrates with Hugging Face

Install required packages:
pip install flask flask-cors python-dotenv requests
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Hugging Face API Configuration
HUGGING_FACE_MODEL_NAME = os.getenv("HUGGING_FACE_MODEL_NAME", "moonshotai/Kimi-K2.5")
HUGGING_FACE_ROUTER_URL = os.getenv(
    "HUGGING_FACE_ROUTER_URL",
    "https://router.huggingface.co/v1/chat/completions"
)
HUGGING_FACE_API_KEY = os.getenv("HUGGING_FACE_API_KEY") or os.getenv("HF_TOKEN")


def call_hugging_face_api(message: str) -> str:
    """
    Call Hugging Face API with the user's message
    
    Args:
        message: User's input message
        
    Returns:
        AI's response text
    """
    if not HUGGING_FACE_API_KEY:
        return "Backend configuration error: missing HUGGING_FACE_API_KEY or HF_TOKEN."

    headers = {
        "Authorization": f"Bearer {HUGGING_FACE_API_KEY}"
    }
    
    payload = {
        "model": HUGGING_FACE_MODEL_NAME,
        "messages": [
            {
                "role": "user",
                "content": message
            }
        ],
        "max_tokens": 512
    }
    
    try:
        response = requests.post(
            HUGGING_FACE_ROUTER_URL,
            headers=headers,
            json=payload,
            timeout=45
        )
        response.raise_for_status()

        # Parse OpenAI-compatible router format first.
        result = response.json()

        if isinstance(result, dict):
            choices = result.get("choices")
            if isinstance(choices, list) and len(choices) > 0:
                first_choice = choices[0]
                if isinstance(first_choice, dict):
                    message_obj = first_choice.get("message")
                    if isinstance(message_obj, dict) and "content" in message_obj:
                        return str(message_obj["content"])

        if isinstance(result, list) and len(result) > 0:
            first = result[0]
            if isinstance(first, dict):
                if 'generated_text' in first:
                    return first['generated_text']
                if 'summary_text' in first:
                    return first['summary_text']
                if 'answer' in first:
                    return first['answer']

        if isinstance(result, dict):
            if 'generated_text' in result:
                return result['generated_text']
            if 'summary_text' in result:
                return result['summary_text']
            if 'answer' in result:
                return result['answer']
            if 'error' in result:
                return f"Hugging Face error: {result['error']}"

        return str(result)
        
    except requests.exceptions.HTTPError as e:
        status_code = e.response.status_code if e.response is not None else "unknown"
        error_body = ""
        try:
            if e.response is not None:
                error_body = e.response.text
        except Exception:
            error_body = ""

        print(f"Hugging Face HTTP error ({status_code}): {error_body}")
        return f"Hugging Face API error ({status_code}). Verify HUGGING_FACE_MODEL_NAME and token scope."
    except requests.exceptions.RequestException as e:
        print(f"Error calling Hugging Face API: {e}")
        return "I apologize, but I encountered an error processing your request. Please try again later."


@app.route('/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint
    
    Expected request body:
    {
        "message": "User's question or message"
    }
    
    Expected response:
    {
        "response": "AI's response with markdown support"
    }
    """
    try:
        # Get message from request
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'Missing required field: message'
            }), 400
        
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'error': 'Message cannot be empty'
            }), 400
        
        # Call Hugging Face API
        ai_response = call_hugging_face_api(user_message)
        
        return jsonify({
            'response': ai_response
        }), 200
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({
            'error': 'Internal server error'
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy'
    }), 200


@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        'name': 'LearnUpon AI Assistant Backend',
        'version': '1.0.0',
        'description': 'Backend API for LearnUpon chatbot'
    }), 200


if __name__ == '__main__':
    print("Starting LearnUpon Backend API...")
    print(f"Using Hugging Face model: {HUGGING_FACE_MODEL_NAME}")
    print(f"Using Hugging Face router: {HUGGING_FACE_ROUTER_URL}")
    print(f"API will be available at http://localhost:8000")
    print("Chat endpoint: POST http://localhost:8000/chat")
    app.run(debug=True, host='0.0.0.0', port=8000)
