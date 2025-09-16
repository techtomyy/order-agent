from django.db import models

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, null=True, blank=True) 
    product = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} ordered {self.quantity} x {self.product}"
