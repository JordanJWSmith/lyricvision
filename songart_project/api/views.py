from django.http import JsonResponse
from rest_framework.decorators import api_view
from .utils import *

@api_view(['POST'])
def reverse_strings(request):
    print('request:', request.data)
    input1 = request.data.get('input1')
    input2 = request.data.get('input2')
    output1 = input1[::-1]
    output2 = input2[::-1]
    result = {'result1': output1, 'result2': output2}
    print('result:', result)
    return JsonResponse(result)


@api_view(['POST'])
def generate_art(request):
    print('request:', request.data)
    song_title = request.data.get('input1')
    song_artist = request.data.get('input2')




# run: python3 manage.py runserver 192.168.1.70:8000