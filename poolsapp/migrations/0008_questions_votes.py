# Generated by Django 4.1.7 on 2023-07-07 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poolsapp', '0007_pool_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='questions',
            name='votes',
            field=models.IntegerField(default=0),
        ),
    ]