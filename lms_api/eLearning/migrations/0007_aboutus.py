# Generated by Django 4.1.1 on 2022-11-03 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eLearning', '0006_alter_teacherresume_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='AboutUs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('designation', models.CharField(max_length=100)),
                ('details', models.TextField(null=True)),
                ('profile_img', models.ImageField(null=True, upload_to='')),
                ('social', models.URLField(unique=True)),
            ],
            options={
                'verbose_name_plural': '0 About us',
            },
        ),
    ]