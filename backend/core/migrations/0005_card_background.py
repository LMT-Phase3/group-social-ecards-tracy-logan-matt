# Generated by Django 3.1.6 on 2021-02-03 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_user_friends'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='background',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
