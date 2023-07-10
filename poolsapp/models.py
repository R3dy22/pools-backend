from django.db import models

class Pool(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    question = models.CharField(max_length=200, default='')
    end_date = models.DateTimeField()

    def __str__(self):
        return self.title
    
class Questions(models.Model):
    pool = models.ForeignKey(Pool, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)