# Generated by Django 4.1.1 on 2022-10-30 08:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0017_trainingsessions_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainingsessions',
            name='status',
        ),
    ]