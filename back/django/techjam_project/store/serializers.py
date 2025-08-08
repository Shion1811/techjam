from rest_framework import serializers
from .models import Shop, Store, StoreImage, Genre

class ShopSerializer(serializers.ModelSerializer): # ここが正しいクラス名か確認
    class Meta:
        model = Shop # 適切なモデル名
        fields = '__all__'

# ジャンルモデル用のシリアライザ
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

# 店舗写真モデル用のシリアライザ
class StoreImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreImage
        fields = ['id', 'image']

# 店舗モデル用のメインシリアライザ
class StoreSerializer(serializers.ModelSerializer):
    # 多対多のリレーションシップを扱うために、GenreSerializerをネストして使用
    # read_only=Trueとすることで、このフィールドは読み取り専用となり、POSTやPUTリクエストで更新されない
    genres = GenreSerializer(many=True, read_only=True)
    
    # ForeignKeyリレーションシップを扱うために、StoreImageSerializerをネストして使用
    images = StoreImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Store
        fields = [
            'id', 
            'owner', 
            'store_name', 
            'address', 
            'tell', 
            'genres', 
            'open_time', 
            'close_time', 
            'holiday', 
            'payment', 
            'images',
        ]
        # ownerフィールドは、リクエスト元のユーザーに自動的に設定されるため、
        # 読み取り専用として設定することが多い
        read_only_fields = ['owner']