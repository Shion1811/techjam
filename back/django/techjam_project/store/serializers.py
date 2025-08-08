from rest_framework import serializers
from .models import Shop # または適切なモデル名

class ShopSerializer(serializers.ModelSerializer): # ここが正しいクラス名か確認
    class Meta:
        model = Shop # 適切なモデル名
        fields = '__all__'