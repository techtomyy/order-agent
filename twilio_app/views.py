import os
import requests
import openai
from django.http import HttpResponse
from twilio.twiml.voice_response import VoiceResponse
from django.views.decorators.csrf import csrf_exempt
from orders.models import Order  # 👈 so we can save to DB

openai.api_key = os.getenv("OPENAI_API_KEY")
@csrf_exempt
def twilio_voice(request):
    """Webhook for incoming calls"""
    response = VoiceResponse()
    response.say("Hello! Please tell me your order after the beep.")
    response.record(
        max_length=20,
        action="/api/twilio/process_recording/",
        play_beep=True
    )
    return HttpResponse(str(response), content_type="application/xml")


@csrf_exempt
def handle_recording(request):
    """Process Twilio recording with Whisper + GPT + TTS"""
    recording_url = request.POST.get("RecordingUrl") + ".mp3"

    # 1️⃣ Download audio
    audio_data = requests.get(recording_url).content

    # 2️⃣ Transcribe audio (ASR)
    transcription = openai.audio.transcriptions.create(
        model="whisper-1",
        file=("recording.mp3", audio_data, "audio/mpeg")
    )
    text = transcription["text"]

    # 3️⃣ Extract structured order with GPT
    order = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extract orders as JSON with keys: customer_name, item, quantity"},
            {"role": "user", "content": text}
        ]
    )
    order_json = order.choices[0].message.content

    # Example order_json: {"customer_name": "Ali", "item": "pizza", "quantity": 2}
    import json
    try:
        order_data = json.loads(order_json)
        Order.objects.create(**order_data)
    except Exception as e:
        order_data = {"customer_name": "Unknown", "item": "N/A", "quantity": 0}

    # 4️⃣ Respond with TTS (Twilio plays voice)
    response = VoiceResponse()
    response.say(f"Thank you {order_data['customer_name']}. "
                 f"Your order of {order_data['quantity']} {order_data['item']} has been placed.")

    return HttpResponse(str(response), content_type="application/xml")
