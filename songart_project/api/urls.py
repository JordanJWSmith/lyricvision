from django.urls import path
from .views import reverse_strings

urlpatterns = [
    path('reverse', reverse_strings),
]