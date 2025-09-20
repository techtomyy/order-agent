import os
import requests
from django.conf import settings

TOKEN = settings.WHATSAPP_TOKEN
PHONE_ID = settings.WHATSAPP_PHONE_ID
API_URL = f"https://graph.facebook.com/v18.0/{PHONE_ID}/messages"

def send_whatsapp_text(to_number, text):
    """
    Send a text message to WhatsApp user.
    to_number must be in international format, e.g. 923001234567
    """
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {"body": text}
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()
