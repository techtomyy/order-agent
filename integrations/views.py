from django.http import HttpResponse, JsonResponse
from django.conf import settings

def whatsapp_webhook(request):
    if request.method == "GET":
        # Verification challenge
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        if mode == "subscribe" and token == settings.VERIFY_TOKEN:
            return HttpResponse(challenge)  # ✅ success
        return JsonResponse({"error": "Verification failed"}, status=403)

    elif request.method == "POST":
        # Handle incoming WhatsApp messages
        print(request.body)
        return JsonResponse({"status": "received"}, status=200)
