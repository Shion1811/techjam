import os
from django.db import models
from pathlib import Path
from accounts.models import CustomUser
class Genre(models.Model):
    # ジャンル名を保存するフィールド。重複しないようにunique=Trueを設定
    name = models.CharField(max_length=50, unique=True, verbose_name="ジャンル名")

    def __str__(self):
        return self.name

class Store(models.Model):
    owner = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        related_name='store', 
        null=True,
        verbose_name="店舗オーナー",
    )
    store_name = models.CharField(max_length=50, verbose_name="店舗名")
    address = models.CharField(max_length=200, verbose_name="店舗住所")
    tell = models.CharField(max_length=15, default='000-0000-0000',verbose_name="電話番号")
    genres = models.ManyToManyField(Genre, verbose_name="ジャンル")
    open_time = models.TimeField(verbose_name="開店時間")
    close_time = models.TimeField(verbose_name="閉店時間")
    holiday = models.CharField(max_length=100, verbose_name="定休日", blank=True, null=True)
    payment = models.CharField(max_length=100, verbose_name="支払い方法")

    def __str__(self):
        return self.store_name

class StoreImage(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='stores/images/', verbose_name="店舗写真")

    def delete(self, *args, **kwargs):
        # データベースのレコードを削除する前に、画像ファイルのパスを保持
        if self.image:
            image_path = self.image.path
            # 親クラスのdeleteメソッドを呼び出してデータベースのレコードを削除
            super().delete(*args, **kwargs)
            # ファイルパスが存在し、かつファイルが実際に存在する場合にのみ削除
            if os.path.exists(image_path):
                os.remove(image_path)



# ----------APIのモデル----------------
class Shop(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True)
    business_hours = models.CharField(max_length=100, blank=True, verbose_name="営業時間")
    phone = models.CharField(max_length=20, blank=True, verbose_name="電話番号")
