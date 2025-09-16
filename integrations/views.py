from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from orders.models import Order  
import json
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def whatsapp_webhook(request):
    if request.method == "GET":
        # ✅ Meta verification step
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")

        VERIFY_TOKEN = "my_secret_token"  # choose your own

        if mode == "subscribe" and token == VERIFY_TOKEN:
            return JsonResponse(int(challenge), safe=False)
        else:
            return JsonResponse({"error": "Verification failed"}, status=403)

    elif request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
            logger.info(f"📩 Incoming Payload: {payload}")

            for entry in payload.get("entry", []):
                for change in entry.get("changes", []):
                    value = change.get("value", {})
                    for msg in value.get("messages", []):
                        from_number = msg["from"]
                        text = msg["text"]["body"]

                        # ✅ Try saving reply into Order if phone matches
                        try:
                            order = Order.objects.get(phone_number=from_number)
                            order.last_reply = text
                            order.save()
                            logger.info(f"💾 Reply saved to Order {order.id}: {text}")
                        except Order.DoesNotExist:
                            logger.warning(f"No order found for {from_number}, just logging reply.")

            return JsonResponse({"status": "received"}, status=200)

        except Exception as e:
            logger.error(f"Webhook error: {e}")
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "method not allowed"}, status=405)

