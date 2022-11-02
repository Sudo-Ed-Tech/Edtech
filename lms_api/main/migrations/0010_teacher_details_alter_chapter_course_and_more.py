# Generated by Django 4.1.1 on 2022-10-02 07:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_course_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='details',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='chapter',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_chapter', to='main.course'),
        ),
        migrations.AlterField(
            model_name='course',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teacher_courses', to='main.teacher'),
        ),
    ]
