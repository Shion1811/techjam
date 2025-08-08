from django.contrib import admin
from .models import Stamp, StampHistory, Coupon  # Couponをインポート

# Stampモデルを管理サイトに登録
@admin.register(Stamp)
class StampAdmin(admin.ModelAdmin):
    list_display = ('id', 'description')

# StampHistoryモデルを管理サイトに登録
@admin.register(StampHistory)
class StampHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'stamp', 'created_at')

# Couponモデルを管理サイトに登録
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('user', 'store', 'description', 'is_used', 'expires_at')
    list_filter = ('is_used', 'expires_at', 'store')
    search_fields = ('user__username', 'description')
