from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SignUpCustomerSerializer, SignUpOwnerSerializer, UserSerializer
from .models import CustomUser

class SignUpCustomerAPIView(generics.CreateAPIView):
    """
    一般ユーザー登録用のAPIエンドポイント
    """
    queryset = CustomUser.objects.all()
    serializer_class = SignUpCustomerSerializer
    permission_classes = [permissions.AllowAny]

class SignUpOwnerAPIView(generics.CreateAPIView):
    """
    経営者ユーザー登録用のAPIエンドポイント
    """
    queryset = CustomUser.objects.all()
    serializer_class = SignUpOwnerSerializer
    permission_classes = [permissions.AllowAny]

class UserDetailAPIView(generics.RetrieveAPIView):
    """
    ユーザー情報を取得するためのAPI
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # ログイン中のユーザー情報を取得
        return self.request.user