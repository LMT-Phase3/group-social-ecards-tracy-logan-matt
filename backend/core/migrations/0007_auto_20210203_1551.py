# Generated by Django 3.1.6 on 2021-02-03 15:51

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210203_1548'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='friends',
            field=models.ManyToManyField(blank=True, null=True, related_name='followers', to=settings.AUTH_USER_MODEL),
        ),
    ]
