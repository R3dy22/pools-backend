# Generated by Django 4.1.7 on 2023-07-18 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poolsapp', '0008_questions_votes'),
    ]

    operations = [
        migrations.AddField(
            model_name='pool',
            name='image_url',
            field=models.CharField(default='', max_length=100),
        ),
    ]