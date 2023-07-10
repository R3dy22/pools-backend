from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from .models import Pool, Questions
from .serializers import PoolSerializer, QuestionSerializer

from django.utils import timezone

class PoolsViewSet(viewsets.ModelViewSet):
    serializer_class = PoolSerializer

    def get_queryset(self):
        # Filter pools based on the expiration date.
        queryset = Pool.objects.filter(end_date__gt=timezone.now())
        return queryset
    
    def retrieve(self, request, pk=None):
        queryset = Pool.objects.all()
        pool = get_object_or_404(queryset, pk=pk)
        serializer = PoolSerializer(pool)
        return Response(serializer.data)

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects.all()
    serializer_class = QuestionSerializer
    
    @action(detail=True, methods=['post'])
    def addVote(self, request, pk):
        queryset = Questions.objects.get(pk=pk)

        queryset.votes += 1
        queryset.save()
        return Response({'status': 'added'})