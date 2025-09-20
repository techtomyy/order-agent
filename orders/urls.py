from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, login_view

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path("login/", login_view, name="login"),
    path('', include(router.urls)),
]