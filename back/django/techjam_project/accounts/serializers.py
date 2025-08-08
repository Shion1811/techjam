from rest_framework import serializers
from .models import CustomUser, Position

class PositionSerializer(serializers.ModelSerializer):
    """
    立場モデルをシリアライズ
    """
    class Meta:
        model = Position
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    """
    ユーザー情報を表示するための読み取り専用シリアライザ
    """
    position = PositionSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'tell', 'birth_data', 'position', 'is_owner']

class SignUpCustomerSerializer(serializers.ModelSerializer):
    """
    一般ユーザー登録用のシリアライザ
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'tell', 'birth_data']
        extra_kwargs = {
            'email': {'required': True},
            'birth_data': {'required': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        # 一般ユーザーとしてis_owner=Falseのまま保存
        return user

class SignUpOwnerSerializer(serializers.ModelSerializer):
    """
    経営者ユーザー登録用のシリアライザ
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'tell', 'birth_data']
        extra_kwargs = {
            'email': {'required': True},
            'birth_data': {'required': True},
        }

    def create(self, validated_data):
        # 経営者としてis_owner=Trueで保存
        user = CustomUser.objects.create_user(**validated_data, is_owner=True)
        return user