# Generated by Django 4.1.1 on 2022-11-03 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('public', '0003_aboutus_social_twitter_alter_aboutus_social_github_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aboutus',
            name='social_github',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='social_linkedin',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='social_twitter',
            field=models.URLField(null=True),
        ),
    ]