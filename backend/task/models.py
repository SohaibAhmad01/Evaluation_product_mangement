from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


# Create your models here.
class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email_address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()


class Product(models.Model):
    CATEGORY_CHOICE = (
        ('MOBILE', 'MOBILE'),
        ('TABLET', 'TABLET'),
        ('HOME APPLIANCES', 'HOME APPLIANCES'),
        ('TVs', 'TVs'),
    )
    name = models.CharField(max_length=255, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.IntegerField()
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICE, null=True, blank=True)


class SaleRecord(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount_of_purchase = models.IntegerField()
    quantity_of_purchase = models.IntegerField()
    amount_of_sale = models.IntegerField()
    quantity_of_sale = models.IntegerField()
    in_stock = models.IntegerField()
    profit_loss = models.CharField(max_length=255, blank=True, null=True)