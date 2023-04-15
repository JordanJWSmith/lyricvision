from django.urls import path
from .views import reverse_strings, generate_art

urlpatterns = [
    path('reverse', reverse_strings),
    path('generate/', generate_art)
]