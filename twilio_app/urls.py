from django.urls import path
from .views import twilio_voice

urlpatterns = [
    path('voice/', twilio_voice, name='twilio-voice'),
]
