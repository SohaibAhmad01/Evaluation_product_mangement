# Generated by Django 4.1.7 on 2023-03-12 18:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.IntegerField()),
                ('category', models.CharField(blank=True, choices=[('MOBILE', 'MOBILE'), ('TABLET', 'TABLET'), ('HOME APPLIANCES', 'HOME APPLIANCES'), ('TVs', 'TVs')], max_length=255, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SaleRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount_of_purchase', models.IntegerField()),
                ('quantity_of_purchase', models.IntegerField()),
                ('amount_of_sale', models.IntegerField()),
                ('quantity_of_sale', models.IntegerField()),
                ('in_stock', models.IntegerField()),
                ('profit_loss', models.CharField(blank=True, max_length=255, null=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task.product')),
            ],
        ),
    ]
