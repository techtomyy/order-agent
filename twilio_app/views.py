from django.http import HttpResponse
from twilio.twiml.voice_response import VoiceResponse

def twilio_voice(request):
    response = VoiceResponse()
    response.say("Hello! Your Django and Twilio integration is working.", voice="alice")
    return HttpResponse(str(response), content_type="application/xml")

