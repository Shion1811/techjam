# stamps/urls.py
from django.urls import path
from .views import AddStampView, StampBookView, CouponListView, stamp_test_page, UseCouponView

urlpatterns = [
    path('add-stamp/<int:store_id>/', AddStampView.as_view(), name='add_stamp'),
    path('stamp-book/', StampBookView.as_view(), name='stamp_book'),
    path('coupons/', CouponListView.as_view(), name='coupon_list'),
    path('test/<int:store_id>/', stamp_test_page, name='stamp_test_page'),
    path('use-coupon/<int:coupon_id>/', UseCouponView.as_view(), name='use_coupon'),
]
