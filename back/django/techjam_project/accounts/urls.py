from django.urls import path
from .views import SignUpCustomerAPIView, SignUpOwnerAPIView, UserDetailAPIView

urlpatterns = [
    # 一般ユーザー登録
    path('api/signup/customer/', SignUpCustomerAPIView.as_view(), name='api_signup_customer'),
    # 経営者ユーザー登録
    path('api/signup/owner/', SignUpOwnerAPIView.as_view(), name='api_signup_owner'),
    # ログイン中のユーザー情報取得
    path('api/me/', UserDetailAPIView.as_view(), name='api_user_detail'),
]