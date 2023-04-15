from django.http import JsonResponse, HttpResponse, FileResponse
from rest_framework.decorators import api_view
from io import BytesIO
from PIL import Image
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
    summarizer = 'luhn'  # for now
    magic_prompt = False  # for now
    song = get_lyrics(song_title, song_artist)

    if song:
        lyrics = process_lyrics(song.lyrics)
        line = extract_lyric(magic_prompt, lyrics, summarizer)
        prompt = generate_prompt(magic_prompt, line, song_title, song_artist)
        print('image prompt: ', prompt)
        img = generate_image(prompt)

        if img:
            annotated_img = annotate(img, line.lower())
            save_fig(annotated_img, song_title, song_artist, summarizer, magic_prompt)

            buffer = BytesIO()
            img.save(buffer, format="PNG")
            image_data = buffer.getvalue()
            return HttpResponse(image_data, content_type='image/png')
            
        else:
            print("There's been a problem generating the image. Please try again.")
            return HttpResponseBadRequest("Error generating image")
    
    else:
        print("There's been a problem retrieving lyrics. Did you spell correctly?")
        return HttpResponseBadRequest("Error retrieving lyrics")
    




# run: python3 manage.py runserver 192.168.1.70:8000