from django.contrib.auth import authenticate
from django.shortcuts import render
from django.db import transaction
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, status
from .serializer import UserSerializer, SaleRecordSerializer, ProductSerializer
from .models import User, SaleRecord, Product
from django.db.models import Sum
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.


@api_view(['GET'])
def something(request):
    return Response('sohaib ahmad id here')


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        data = request.data
        check_user = User.objects.filter(email=data['email']).first()
        if check_user:
            return Response({
                "message": "User has been already there"
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            user = UserSerializer(data=data)
            if user.is_valid(raise_exception=True):
                user = user.save()
                user.set_password(data['password'])
                user.save()
                return Response({
                    "message": "user has been created successfully"
                }, status=status.HTTP_201_CREATED)


class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        email = request.data['email']
        password = request.data["password"]
        user = authenticate(email=email, password=password)
        if user:
            token = get_tokens_for_user(user)
            user_data = UserSerializer(user).data
            user_data['accessToken'] = token['access']
            user_data['refresh'] = token['refresh']
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "This user doesn't exist"
            }, status=status.HTTP_400_BAD_REQUEST)


class ProductManagement(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, url_path="add_product", methods=['post'])
    def add_product(self, request):
        try:
            data = request.data
            data['user'] = request.user.id
            product_serializer = ProductSerializer(data=data)
            if product_serializer.is_valid():
                product_serializer.save()
                a = 10
                data = request.data.copy()
                data['product'] = product_serializer.data['id']
                sale_record_serializer = SaleRecordSerializer(data=data)
                if sale_record_serializer.is_valid():
                    sale_record_serializer.save()
                    return Response({'data': sale_record_serializer.data}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': sale_record_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': product_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, url_path="get_product", methods=['get'])
    def get_product(self, request):
        all_products = Product.objects.filter(user=request.user)
        all_data = SaleRecord.objects.filter(product__in=all_products)
        data = SaleRecordSerializer(all_data, many=True).data
        amount_of_purchase = all_data.aggregate(Sum('amount_of_purchase'))
        amount_of_purchase = amount_of_purchase['amount_of_purchase__sum']

        quantity_of_purchase = all_data.aggregate(Sum('quantity_of_purchase'))
        quantity_of_purchase = quantity_of_purchase['quantity_of_purchase__sum']

        amount_of_sale = all_data.aggregate(Sum('amount_of_sale'))
        amount_of_sale = amount_of_sale['amount_of_sale__sum']

        quantity_of_sale = all_data.aggregate(Sum('quantity_of_sale'))
        quantity_of_sale = quantity_of_sale['quantity_of_sale__sum']

        in_stock = all_data.aggregate(Sum('in_stock'))
        in_stock = in_stock['in_stock__sum']

        all_data = {}
        all_data['amount_of_purchase'] = amount_of_purchase
        all_data['quantity_of_purchase'] = quantity_of_purchase
        all_data['amount_of_sale'] = amount_of_sale
        all_data['quantity_of_sale'] = quantity_of_sale
        all_data['all_in_stock'] = in_stock

        profit_loss = amount_of_sale - amount_of_purchase
        if profit_loss < 0:
            all_data['profit'] = 0
        else:
            all_data['profit'] = amount_of_sale - amount_of_purchase

        return Response({'product_record': data, 'overall_record': all_data}, status=status.HTTP_200_OK)
