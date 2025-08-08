from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StoreViewSet, StampViewSet, StampHistoryViewSet, CouponViewSet, hello_api

router = DefaultRouter()
router.register(r'stores', StoreViewSet)
router.register(r'stamps', StampViewSet)
router.register(r'stamp-histories', StampHistoryViewSet)
router.register(r'coupons', CouponViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('hello/', hello_api),
]
