from django.urls import path
from .views import something, UserViewSet, LoginViewSet, ProductManagement
from rest_framework.routers import SimpleRouter

router = SimpleRouter(trailing_slash=False)
router.register(r'user', UserViewSet)
router.register('', ProductManagement, basename='')

urlpatterns = [
    path('something', something),
    path("user/register", UserViewSet.as_view({
        "post": "create",
    })),
    path("auth/login", LoginViewSet.as_view({
        "post": "create",
    })),
]
urlpatterns += router.urls
