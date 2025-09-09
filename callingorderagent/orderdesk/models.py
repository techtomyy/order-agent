import uuid
from django.db import models

# Create your models here.

class Order(models.Model):
    STATUS_CHOICES = [
        ("pending_confirmation", "Pending Confirmation"),
        ("confirmed", "Confirmed"),
        ("out_for_delivery", "Out for Delivery"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=20)
    items = models.JSONField()  # [{"item": "Burger", "qty": 2, "price": 500}]
    address = models.TextField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="pending_confirmation")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.customer_name} ({self.status})"
