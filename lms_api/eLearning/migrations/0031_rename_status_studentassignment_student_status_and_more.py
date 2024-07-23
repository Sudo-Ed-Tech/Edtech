# Generated by Django 4.1.1 on 2023-04-10 06:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('eLearning', '0030_remove_studentassignment_student_status_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentassignment',
            old_name='status',
            new_name='student_status',
        ),
        migrations.AlterField(
            model_name='studentassignment',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='eLearning.student'),
        ),
        migrations.AlterField(
            model_name='studentassignment',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='eLearning.teacher'),
        ),
    ]