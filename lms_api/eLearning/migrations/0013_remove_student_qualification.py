from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("eLearning", "0012_student_profile_img"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="student",
            name="qualification",
        ),
    ]