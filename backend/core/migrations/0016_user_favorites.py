# Generated by Django 3.1.6 on 2021-02-10 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20210210_1545'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorites',
            field=models.ManyToManyField(blank=True, related_name='favorite_cards', to='core.Card'),
        ),
    ]
