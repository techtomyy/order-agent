from django.urls import path
from . import views

urlpatterns = [
    path("voice/", views.twilio_voice, name="twilio_voice"),
    path("process_recording/", views.handle_recording, name="handle_recording"),
]
