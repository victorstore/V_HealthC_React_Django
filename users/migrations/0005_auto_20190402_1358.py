# Generated by Django 2.1.7 on 2019-04-02 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20190402_1330'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='session_1_end',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='session_1_start',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='session_2_end',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='session_2_start',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
