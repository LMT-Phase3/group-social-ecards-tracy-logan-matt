# Generated by Django 3.1.6 on 2021-02-07 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_auto_20210207_1851'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='created_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
