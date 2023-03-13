from rest_framework import serializers
from .models import User, Product, SaleRecord


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class SaleRecordSerializer(serializers.ModelSerializer):
    product_data = serializers.SerializerMethodField('get_product_data')

    class Meta:
        model = SaleRecord
        fields = "__all__"

    def get_product_data(self, obj):
        if obj.product:
            data = ProductSerializer(obj.product).data
            return data
        else:
            return ''
