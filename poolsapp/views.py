from django.shortcuts import render
from django.utils import timezone
from .models import Pool, Questions

def index(request):
    live_pools = Pool.objects.order_by("-end_date")
    for pool in live_pools:
        print(pool.end_date)
    context = {'live_pools': live_pools}
    return render(request, 'index.html', context)

def pool(request, pool_id):
    pool = Pool.objects.get(pk=pool_id)
    live_questions = Questions.objects.filter(pool=pool)
    for question in live_questions:
        print(question.question_text)
    context = {'pool' : pool, 'choices' : live_questions}
    return render(request, 'pool.html', context)

def create_pool(request):
    return render(request, 'create_pool.html')

