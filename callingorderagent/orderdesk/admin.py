from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "customer_phone", "status", "created_at")
    search_fields = ("customer_name", "customer_phone")
    list_filter = ("status", "created_at")