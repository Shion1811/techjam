from django.db import models
from django.contrib.auth.models import User

# Storeモデルとの一対一の関係はstore/models.pyで定義するため、
# こちらではStoreモデルのインポートと関連フィールドを削除します。


class Stamp(models.Model):
    # 店舗との関連はstore/models.pyで定義
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"Stamp - {self.description}"


class StampHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stamp = models.ForeignKey(Stamp, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.stamp.description} - {self.created_at}"


class Coupon(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # 循環インポートを防ぐため、'store.Store'と文字列で参照
    store = models.ForeignKey('store.Store', on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=255)
    is_used = models.BooleanField(default=False)
    issued_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)  # 有効期限

    def __str__(self):
        return f"Coupon for {self.user.username} at {self.store} - Used: {self.is_used}"
