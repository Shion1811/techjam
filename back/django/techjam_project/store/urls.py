from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static

# API用のルーター
from rest_framework.routers import DefaultRouter
from .views import ShopViewSet

router = DefaultRouter()
router.register(r'shops', ShopViewSet)

urlpatterns = [
    path('stores/', views.stores, name='stores'),
    path('stores/register/', views.store_create, name='stores_create'),
    path('stores/<int:store_id>/', views.store_detail, name='store_detail'),
    path('stores/<int:store_id>/edit/', views.store_edit, name='store_edit'),
    path('stores/<int:store_id>/delete/', views.store_delete, name="store_delete"),
    
    # API用のURLパターン
    path('api/', include(router.urls)),
    
    # Google Maps API用のURLパターン
    path('api/search-nearby/', views.search_nearby_shops, name='search_nearby_shops'),
    path('api/shop-details/<str:place_id>/', views.get_shop_details, name='get_shop_details'),
    path('api/save-google-shop/', views.save_google_shop, name='save_google_shop'),
]