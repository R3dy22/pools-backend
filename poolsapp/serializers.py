from rest_framework import serializers
from .models import Pool, Questions

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ('id', 'question_text', 'votes')

class PoolSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Pool
        fields = ('id', 'title', 'description', 'end_date', 'question', 'questions')

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        pool = Pool.objects.create(**validated_data)
        for question_data in questions_data:
            Questions.objects.create(pool=pool, **question_data)
        return pool
