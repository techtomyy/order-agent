from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt 
import json, logging

logger = logging.getLogger(__name__)

@csrf_exempt  
def webhook(request):
    if request.method == "GET":
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        if mode == "subscribe" and token == settings.VERIFY_TOKEN:
            return HttpResponse(challenge)
        return JsonResponse({"error": "Verification failed"}, status=403)

    elif request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            logger.info("Incoming WhatsApp payload: %s", data)
            return JsonResponse({"status": "received"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

