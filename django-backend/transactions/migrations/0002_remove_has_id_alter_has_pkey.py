# Generated by Django 4.1.2 on 2022-12-31 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='has',
            name='id',
        ),
        migrations.AlterField(
            model_name='has',
            name='pKey',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
