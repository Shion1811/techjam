from rest_framework import serializers
from .models import Store, Stamp, StampHistory, Coupon

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class StampSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stamp
        fields = '__all__'

class StampHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StampHistory
        fields = '__all__'

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'
