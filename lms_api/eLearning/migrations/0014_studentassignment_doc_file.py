from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eLearning", "0013_remove_student_qualification"),
    ]

    operations = [
        migrations.AddField(
            model_name="studentassignment",
            name="doc_file",
            field=models.FileField(null=True, upload_to="Assignmnets/"),
        ),
    ]