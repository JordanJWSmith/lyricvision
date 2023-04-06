from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['POST'])
def reverse_strings(request):
    print('request:', request.data)
    input1 = request.data.get('input1')
    input2 = request.data.get('input2')
    output1 = input1[::-1]
    output2 = input2[::-1]
    result = {'result1': output1, 'result2': output2}
    print(result)
    # result = f'{output1} {output2}'
    # return JsonResponse({'result': result})
    return JsonResponse(result)
    # return 'Test'